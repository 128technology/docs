const lunr = require('lunr');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

module.exports = function searchIndexPlugin({siteDir}) {
  return {
    name: 'search-index',
    loadContent: async () => {
      const docsDir = path.join(siteDir, 'docs');
      const filenames = await readdir(docsDir);

      const documents = await Promise.all(
        filenames
          .filter((filename) => !filename.startsWith('_'))
          .filter((filename) => !filename.endsWith('.js'))
          .map(async (filename) => {
            const fileContents = await readFile(
              path.join(docsDir, filename),
              'utf8',
            );
            const {data, content} = matter(fileContents);
            return {
              id: filename.replace(/\.md$/, ''),
              title: data.title,
              content,
              //rawContent:fileContents,
            };
          }),
      );

      const idx = lunr(function () {
        this.ref('id');
        this.field('title');
        this.field('content');
        this.metadataWhitelist = ['position'];

        documents.forEach((doc) => {
          try {
            this.add(doc);
          } catch (err) {
            console.error(
              `Error adding document ${doc.id} to the index: ${err}`,
            );
          }
        }, this);
      });

      return {index: idx.toJSON(), documents};
    },
    contentLoaded: async ({content, actions: {setGlobalData}}) =>
      setGlobalData(content),
  };
};
