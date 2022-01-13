import styles from './signup.module.scss';
import layout from '../../styles/layout.module.scss';

import SignupCard from '../../components/signupCard/signupCard.js';

export default function Signup () {
  return (
    <>
      <main className={`${styles['container']} ${layout['flex']} ${layout['justify-center']} ${layout['align-center']}`}>
        <SignupCard className={`${styles['container-signup-card']} `} />
      </main>
    </>
  );
}
