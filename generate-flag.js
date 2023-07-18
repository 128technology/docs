const fs = require('fs');
const path = require('path');

const isLocalSSR = process.env.BUILD_ENV === 'local';
const data = { isLocalSSR };

fs.writeFileSync(
  path.join(__dirname, './static/ssrflag.json'),
  JSON.stringify(data),
);
