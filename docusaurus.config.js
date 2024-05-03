module.exports = {
  title: 'SSN Docs',
  tagline: 'The documentation source for the Session Smart Networking Platform',
  //url: 'https://docs.128technology.com',
  url: 'https://uat.juniper.net',
  //baseUrl: process.env.OFFLINE_DOCS ? '/offline-docs/' : '/',
  baseUrl: '/documentation/us/en/software/session-smart-router/',
  favicon: 'img/favicon.png',
  organizationName: '128technology', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  onBrokenAnchors: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'throw',
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
      title: '',
      logo: {
        alt: 'Juniper Logo',
        src: 'img/logo.png',
        srcDark: 'img/logo_dark.png',
      },
      items: [
        {
          to: 'docs/intro_getting_started',
          label: 'Docs',
          position: 'right',
        },
        {
          to: 'kb',
          label: 'Knowledge Base',
          position: 'right',
        },
        {
          href: 'https://community.juniper.net/answers/communities/community-home?CommunityKey=310d1a41-12fa-4627-9a99-880145a7c87c',
          label: 'Community',
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
          showLastUpdateTime: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        blog: {
          path: 'kb',
          routeBasePath: 'kb',
          blogTitle: 'Session Smart Router Knowledge Base Articles',
          postsPerPage: 'ALL',
          //blogSidebarTitle: 'Last 10 Posts',
          blogSidebarCount: 0,
          showReadingTime: false,
          feedOptions: {
            type: 'all',
            title: 'SSR Knowledge Base Articles',
            description: 'Session Smart Router Knowledge Base Articles',
            limit: 20,
            copyright: `Copyright © ${new Date().getFullYear()} Juniper Networks, Inc.`,
            language: 'en-US',
            createFeedItems: async (params) => {
              const {blogPosts, defaultCreateFeedItems, ...rest} = params;
              return defaultCreateFeedItems({
                // keep only the 10 most recent blog posts in the feed
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
        },
      },
    ],
  ],
  plugins: process.env.OFFLINE_DOCS
    ? ['./src/plugins/release-notes-api.js', './src/plugins/search-index.js']
    : ['./src/plugins/release-notes-api.js'],
  customFields: {
    offlineDocs: process.env.OFFLINE_DOCS === '1',
    marvisSearch: {
      docSource: '128t',
      numResults: 15,
      proxyURL:
        'https://raq48a0wrg.execute-api.us-east-1.amazonaws.com/prod/marvis_docs_api_proxy',
    },
  },
};

if (process.env.OFFLINE_DOCS) {
  module.exports.themeConfig.announcementBar = {
    id: 'offline_docs',
    content:
      'You are viewing a local version of this documentation. ' +
      'For the most up-to-date information please visit the <a target="_blank" href="https://docs.128technology.com/">online documentation</a>',
    backgroundColor: '#eed202',
    textColor: '#000',
    isCloseable: true,
  };
}
