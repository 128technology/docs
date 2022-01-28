const https = require('https');

const token = process.env.TOKEN;
const org = process.env.ORG;

exports.handler = async (event, context) => {
  const body = await new Promise((res, rej) => {
    const req = https.request(
      {
        hostname: 'api.mist.com',
        path: `/api/v1/labs/orgs/${org}/knowledge_search`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${token}`,
        },
      },
      (resp) => {
        let buff = '';
        resp.on('data', (d) => (buff += d.toString()));
        resp.on('end', () => res(buff));
      },
    );

    req.on('error', (err) => rej(err));
    req.write(event.body);
    req.end();
  });

  return {
    statusCode: '200',
    body,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
  };
};
