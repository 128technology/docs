module.exports = function (context, options) {
  return {
    name: 'adobe-analytics-plugin',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              type: 'text/javascript',
              src: '//assets.adobedtm.com/998b2d6d4944658536fe36266a249b07e626b86d/satelliteLib-6d05b7c7a99e1cbbdcac4fcfe7005e6bee80a0e9.js',
              async: true,
            },
          },
        ],
        postBodyTags: [
          {
            tagName: 'script',
            attributes: {
              type: 'text/javascript',
              src: '_satellite.pageBottom();',
            },
          },
        ],
      };
    },
  };
};
