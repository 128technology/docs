module.exports = {
  title: 'SSN Docs',
  tagline: 'The documentation source for the Session Smart Networking Platform',
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
        srcDark: 'img/logo_dark.png',
      },
      items: [
        {to: 'docs/intro_getting_started', label: 'Docs', position: 'right'},
        {
          href: 'https://community.juniper.net/answers/communities/community-home?CommunityKey=310d1a41-12fa-4627-9a99-880145a7c87c',
          label: 'Session Smart Community',
          position: 'right',
        },
        {
          href: 'https://www.juniper.net/',
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
    './src/plugins/release-notes-api.js',
  ],
  customFields: {
    marvisSearch: {
      docSource: "128t",
      numResults: 15,
      proxyURL: 'https://raq48a0wrg.execute-api.us-east-1.amazonaws.com/prod/marvis_docs_api_proxy',
    },
  },
};
