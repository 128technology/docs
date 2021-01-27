module.exports = {
  title: '128T Docs',
  tagline: 'The documentation source for the 128T Networking Platform',
  url: 'https://docs.128technology.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: '128technology', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  themeConfig: {
    colorMode: {
      // "light" | "dark"
      defaultMode: 'light',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: true,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Session Smart',
      logo: {
        alt: 'Juniper Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: 'docs/intro_getting_started', label: 'Docs', position: 'right'},
        {href: 'https://community.128technology.com/home', label: 'Interchange', position: 'right'},
        {href: 'https://www.128technology.com/', label:'Company', position: 'right'},
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Juniper Networks, Inc.`,
    },
    algolia: {
      apiKey: '1ee0f6866243c8e25883eee3ce0708ce',
      indexName: '128technology',
      algoliaOptions: {},
    },
    googleAnalytics: {
      trackingID: 'UA-167298415-2',
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
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
