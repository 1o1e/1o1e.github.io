import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import * as fs from 'fs';
import * as path from 'path';

// Define the canonical topic order for the navbar dropdown
const TOPIC_ORDER = ['community', 'essay', 'drafts',];

type NavItem =
  | {type: 'html'; value: string; className?: string}
  | {label: string; to: string};

// Build-time: read posts from projects/ grouped by tag for navbar dropdown
function getProjectNavItemsByTopic(): NavItem[] {
  const dir = path.join(__dirname, 'projects');
  if (!fs.existsSync(dir)) return [];

  const tagPosts: Record<string, {label: string; to: string}[]> = {};

  fs.readdirSync(dir)
    .filter((f) => /\.(md|mdx)$/.test(f))
    .sort()
    .reverse()
    .forEach((file) => {
      const content = fs.readFileSync(path.join(dir, file), 'utf8');
      const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!fmMatch) return;
      const fm = fmMatch[1];
      const titleMatch = fm.match(/^title:\s*(.+)$/m);
      const title = titleMatch
        ? titleMatch[1].trim().replace(/^['"]|['"]$/g, '')
        : file;
      const m = file.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.(md|mdx)$/);
      if (!m) return;
      const [, year, month, day, slug] = m;
      const permalink = `/projects/${year}/${month}/${day}/${slug}`;

      // Parse inline tags: [a, b, c]
      const inlineTagsMatch = fm.match(/^tags:\s*\[([^\]]+)\]/m);
      const blockTagsMatch = fm.match(/^tags:\s*\n((?:\s+-\s*.+\n?)+)/m);
      let tags: string[] = [];
      if (inlineTagsMatch) {
        tags = inlineTagsMatch[1]
          .split(',')
          .map((t) => t.trim().replace(/^['"]|['"]$/g, '').toLowerCase())
          .filter(Boolean);
      } else if (blockTagsMatch) {
        tags = blockTagsMatch[1]
          .split('\n')
          .map((l) => l.replace(/^\s*-\s*/, '').trim().replace(/^['"]|['"]$/g, '').toLowerCase())
          .filter(Boolean);
      }

      for (const tag of tags) {
        if (!tagPosts[tag]) tagPosts[tag] = [];
        tagPosts[tag].push({label: title, to: permalink});
      }
    });

  const items: NavItem[] = [];
  let first = true;
  for (const topic of TOPIC_ORDER) {
    const posts = tagPosts[topic];
    if (!posts?.length) continue;
    const separator = first ? '' : 'margin-top: 0.5rem; border-top: 1px solid var(--ifm-toc-border-color); padding-top: 0.5rem;';
    items.push({
      type: 'html',
      value: `<span style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--ifm-color-emphasis-500);padding:0 0.75rem;display:block;${separator}">${topic.charAt(0).toUpperCase() + topic.slice(1)}</span>`,
    });
    for (const post of posts) items.push(post);
    first = false;
  }

  return items;
}

const projectNavItemsByTopic = getProjectNavItemsByTopic();

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

  plugins: [require.resolve('./plugins/blog-tag-data')],

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
          blogSidebarCount: 0,
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
          type: 'dropdown',
          label: 'Topics',
          position: 'right',
          items: [
            ...projectNavItemsByTopic,
          ],
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
