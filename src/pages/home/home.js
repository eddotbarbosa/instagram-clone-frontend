
import useAuth from '../../hooks/useAuth';

import styles from './home.module.scss';
import layout from '../../styles/layout.module.scss';

import CarouselPhone from '../../components/carouselPhone/carouselPhone.js';
import LoginCard from '../../components/loginCard/loginCard.js';
import Feed from '../../components/feed/feed.js';

export default function Home () {
  const {auth} = useAuth();

  return (
    <>
        {auth ? (
          <main className={`${styles['timeline-container']} ${layout['flex']} ${layout['justify-center']}`}>
            <Feed />
          </main>
        ) : (
          <main className={`${styles['home-container']} ${layout['flex']} ${layout['justify-center']} ${layout['align-center']}`}>
            <CarouselPhone className={`${layout['hide-md']} `} />
            <LoginCard className={`${styles['login-card']} `} />
          </main>
        )}
    </>
  );
}
