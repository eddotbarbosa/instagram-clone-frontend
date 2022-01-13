import styles from './post.module.scss';

import PostCard from '../../components/postCard/postCard.js';

export default function Post () {
  return (
    <main className={`${styles['post-container']}`}>
      <PostCard className={`${styles['post-card']} `} />
    </main>
  );
}
