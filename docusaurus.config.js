const path = require('path');

module.exports = {
  title: '128T Docs',
  tagline: 'The documentation source for the 128T Networking Platform',
  //url: 'https://docs.128technology.com',
  url: 'https://uat.juniper.net',
  //baseUrl: '/',
  baseUrl: '/documentation/us/en/software/session-smart-router/',
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
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Session Smart',
      logo: {
        alt: 'Juniper Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo_dark.png',
      },
      items: [
        {to: 'docs/intro_getting_started', label: 'Docs', position: 'right'},
        {
          href: 'https://community.128technology.com/home',
          label: 'Interchange',
          position: 'right',
        },
        {
          href: 'https://www.128technology.com/',
          label: 'Company',
          position: 'right',
        },
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Juniper Networks, Inc.`,
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
  plugins: [
    path.resolve(__dirname, './src/components/adobe-analytics-plugin'),
    './src/plugins/release-notes-api.js',
  ],
  customFields: {
    search: {
      orgId: '0f342292-b359-4adf-b34c-a24aad8d3433',
      token:
        'ZQJJECTUUgO0XNnwP0BjMJGzLmfgRgr1U92JSfG9XkabYere9Yxaza0b7ZhnI2WenU4C9KgZKL1Mh1abkPtrd3SkaaM1WZ7q',
      docSource: '128t',
    },
  },
};
