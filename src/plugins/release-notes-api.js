const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);
const fsExists = util.promisify(fs.exists);

module.exports = function releaseNotesPlugin() {
  return {
    name: 'release-notes-api',
    async postBuild({outDir, siteDir}) {
      const docsDir = path.join(siteDir, 'docs');
      const docs = await readdir(docsDir);

      const releaseNotes = docs.filter(x =>
        /release_notes_128t_\d+\.\d+\.md$/.test(x),
      );

      const apiDir = path.join(outDir, 'api');
      if (!(await fsExists(apiDir))) {
        await mkdir(apiDir);
      }

      const jobs = releaseNotes.map(async note => {
        const content = await readFile(path.join(docsDir, note), 'utf8');
        const data = JSON.stringify({content});

        await writeFile(
          path.join(outDir, 'api', note.replace(/\.md$/, '.json')),
          data,
        );
      });

      await Promise.all(jobs);
    },
  };
};
