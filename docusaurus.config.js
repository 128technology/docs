module.exports = {
  title: '128T Docs',
  tagline: 'The documentation source for the 128T Networking Platform',
  url: 'https://docs.128technology.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: '128technology', // Usually your GitHub org/user name.
  projectName: '128t-docs', // Usually your repo name.
  themeConfig: {
    disableDarkMode: true,
    navbar: {
      title: '',
      logo: {
        alt: '128 Technology Logo',
        src: 'img/128t_black.png',
      },
      links: [
        {to: 'docs/intro_getting_started', label: 'Docs', position: 'right'},
        {href: 'https://community.128technology.com/home', label: 'Interchange', position: 'right'},
        {href: 'https://www.128technology.com/', label:'Company', position: 'right'},
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} 128 Technology, Inc.`,
    },
    algolia: {
      apiKey: '1ee0f6866243c8e25883eee3ce0708ce',
      indexName: '128technology',
      algoliaOptions: {},
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/128technology/docs/tree/master',
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
