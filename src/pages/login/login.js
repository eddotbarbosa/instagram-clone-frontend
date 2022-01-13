import styles from './login.module.scss';
import layout from '../../styles/layout.module.scss';

import LoginCard from '../../components/loginCard/loginCard.js';

export default function Login () {
  return (
    <>
      <main className={`${styles['login-container']} ${layout['flex']} ${layout['justify-center']} ${layout['align-center']}`}>
        <LoginCard className={`${styles['login-card']} `} />
      </main>
    </>
  );
}
