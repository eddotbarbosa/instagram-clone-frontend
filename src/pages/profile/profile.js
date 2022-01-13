import styles from './profile.module.scss';

import ProfileHeader from '../../components/profileHeader/profileHeader.js';
import PostGallery from '../../components/postGallery/postGallery.js';

export default function Profile () {
  return (
    <main className={`${styles['profile-container']}`}>
      <ProfileHeader className={`${styles['profile-header']} `} />
      <PostGallery className={`${styles['post-galery']} `} />
    </main>
  );
}
