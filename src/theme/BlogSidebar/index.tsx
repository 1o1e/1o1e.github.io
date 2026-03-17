import React from 'react';
import type BlogSidebarType from '@theme/BlogSidebar';
import type {WrapperProps} from '@docusaurus/types';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './styles.module.css';

type Props = WrapperProps<typeof BlogSidebarType>;

type TagPost = {title: string; permalink: string};
type TagPostsData = {tagPosts: Record<string, TagPost[]>};

const TOPICS = [
  {key: 'drafts', label: 'Drafts', to: '/projects/tags/drafts'},
  {key: 'community', label: 'Community', to: '/projects/tags/community'},
  {key: 'essay', label: 'Essay', to: '/projects/tags/essay'},
];

export default function BlogSidebarWrapper(_props: Props): JSX.Element {
  const {tagPosts} = usePluginData('blog-tag-data') as TagPostsData;

  return (
    <nav className={styles.topicsNav}>
      {TOPICS.map(({key, label, to}, i) => {
        const posts = tagPosts?.[key] ?? [];
        return (
          <section
            key={to}
            className={i > 0 ? styles.topicSection : undefined}>
            <Link to={to} className={styles.topicsHeadingLink}>
              <h3 className={styles.topicsTitle}>{label}</h3>
            </Link>
            {posts.length > 0 && (
              <ul className={styles.topicsList}>
                {posts.map((post) => (
                  <li key={post.permalink}>
                    <Link to={post.permalink} className={styles.topicLink}>
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </nav>
  );
}
