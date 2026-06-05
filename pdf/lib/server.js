/*
 * Local static-file server for the built Docusaurus site.
 * Serves the given directory on a free port and returns the base URL.
 */

const http = require('http');
const handler = require('serve-handler');

function startServer(rootDir) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) =>
      handler(req, res, {
        public: rootDir,
        // Disable serve-handler's URL-cleaning heuristics. They strip
        // `/index.html` and trailing slashes, which collides with doc ids
        // that contain dots (e.g. release_notes_128t_6.3) and breaks
        // routing.
        cleanUrls: false,
        trailingSlash: false,
      }),
    );
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({
        server,
        baseUrl: `http://127.0.0.1:${port}`,
        close: () =>
          new Promise((res) => {
            server.close(() => res());
          }),
      });
    });
  });
}

module.exports = { startServer };
