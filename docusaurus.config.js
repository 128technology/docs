/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  title: '128T Docs',
  tagline: 'The documentation resource for the 128T Networking Platform',
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
        {to: 'docs/doc1', label: 'Docs', position: 'left'},
        {href: 'https://community.128technology.com/home', label: 'Interchange', position: 'left'},
        {href: 'https://www.128technology.com/', label:'Company', position: 'left'},
        // Please keep GitHub link to the right for consistency.
        {
          href: 'https://github.com/128technology/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/doc1',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Test',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
      ],
      logo: {
        alt: 'Facebook Open Source Logo',
        src: 'img/oss_logo.png',
        href: 'https://opensource.facebook.com/',
      },
      // Please do not remove the credits, help to publicize Docusaurus :)
      copyright: `Copyright © ${new Date().getFullYear()} 128 Technology, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
