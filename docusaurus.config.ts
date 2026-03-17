import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '1o1e',
  tagline: 'Documentation, Articles, and Essays',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://1o1e.github.io',
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '1o1e', // Usually your GitHub org/user name.
  projectName: '1o1e.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: {
          path: 'projects',
          routeBasePath: 'projects',
          blogTitle: 'Projects',
          blogDescription: 'Projects, articles, and essays by 1o1e',
          blogSidebarCount: 10,
          blogSidebarTitle: 'Recent projects',
          postsPerPage: 10,
          showReadingTime: true,
          tags: 'tags.yml',
          onInlineTags: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // TODO: Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },
    navbar: {
      title: '1o1e',
      items: [
        {
          to: '/projects',
          label: 'Projects',
          position: 'right',
        },
        {
          to: '/projects/tags',
          label: 'Topics',
          position: 'right',
        },
        {
          href: 'https://github.com/1o1e/1o1e.github.io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Links',
          items: [
            {
              label: 'Home',
              to: '/',
            },
            {
              label: 'Projects',
              to: '/projects',
            },
            {
              label: 'Topics',
              to: '/projects/tags',
            },
          ],
        },
        {
          title: 'Socials',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/azul-rojo/1o1e.github.io',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 1o1e. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
