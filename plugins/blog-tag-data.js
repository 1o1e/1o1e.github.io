// @ts-check
const fs = require('fs');
const path = require('path');

/**
 * Reads the projects/ directory and exposes a tag → posts mapping
 * via setGlobalData so the BlogSidebar component can group posts by topic.
 *
 * @param {import('@docusaurus/types').LoadContext} context
 * @returns {import('@docusaurus/types').Plugin}
 */
module.exports = function blogTagDataPlugin(context) {
  return {
    name: 'blog-tag-data',
    async contentLoaded({actions}) {
      const projectsDir = path.join(context.siteDir, 'projects');
      const tagPosts = {};

      if (!fs.existsSync(projectsDir)) {
        actions.setGlobalData({tagPosts});
        return;
      }

      const files = fs
        .readdirSync(projectsDir)
        .filter((f) => /\.(md|mdx)$/.test(f));

      for (const file of files) {
        const content = fs.readFileSync(
          path.join(projectsDir, file),
          'utf8',
        );

        // Extract frontmatter block
        const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (!fmMatch) continue;
        const fm = fmMatch[1];

        // Parse title
        const titleMatch = fm.match(/^title:\s*(.+)$/m);
        const title = titleMatch
          ? titleMatch[1].trim().replace(/^['"]|['"]$/g, '')
          : file;

        // Parse tags — handles both [a, b] and multiline list formats
        let tags = [];
        const inlineTagsMatch = fm.match(/^tags:\s*\[([^\]]+)\]/m);
        const blockTagsMatch = fm.match(/^tags:\s*\n((?:\s+-\s*.+\n?)+)/m);

        if (inlineTagsMatch) {
          tags = inlineTagsMatch[1]
            .split(',')
            .map((t) => t.trim().replace(/^['"]|['"]$/g, ''))
            .filter(Boolean);
        } else if (blockTagsMatch) {
          tags = blockTagsMatch[1]
            .split('\n')
            .map((l) => l.replace(/^\s*-\s*/, '').trim().replace(/^['"]|['"]$/g, ''))
            .filter(Boolean);
        }

        if (!tags.length) continue;

        // Derive permalink from filename: YYYY-MM-DD-slug.md → /projects/YYYY/MM/DD/slug
        const dateSlugMatch = file.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.(md|mdx)$/);
        let permalink;
        if (dateSlugMatch) {
          const [, year, month, day, slug] = dateSlugMatch;
          permalink = `/projects/${year}/${month}/${day}/${slug}`;
        } else {
          permalink = `/projects/${file.replace(/\.(md|mdx)$/, '')}`;
        }

        for (const tag of tags) {
          if (!tagPosts[tag]) tagPosts[tag] = [];
          tagPosts[tag].push({title, permalink});
        }
      }

      actions.setGlobalData({tagPosts});
    },
  };
};
