---
title: Site Setup Notes
date: 2026-03-16
tags: [drafts]
---

Working notes on setting up this site.

<!-- truncate -->

- Built with [Docusaurus](https://docusaurus.io) v3
- Hosted on GitHub Pages
- Posts live in the `projects/` folder
- Tags are defined in `projects/tags.yml`

## Adding a new post

Create a file in `projects/` named `YYYY-MM-DD-slug.md` with frontmatter:

```md
---
title: My Post
date: 2026-03-16
tags: [community]
---

Content here.
```

Available tags: `drafts`, `community`, `open-source`, `tutorial`, `essay`.
