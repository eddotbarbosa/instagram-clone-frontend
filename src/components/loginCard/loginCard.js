import {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import useAuth from '../../hooks/useAuth.js';

import styles from './loginCard.module.scss';
import layout from '../../styles/layout.module.scss';

import appStoreBadge from '../../assets/images/appstore-badge.png';
import googlePlayBadge from '../../assets/images/googleplay-badge.png';
import instagramTypoLogo from '../../assets/images/instagram-typo-logo.png';
import faceBookLogo from '../../assets/images/facebook.svg';

export default function LoginCard ({className}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const {signin, alert} = useAuth();

  const handleLogin = (event) => {
    signin(event, email, password, () => {
      history.push('/');
    });
  }

  return (
    <div className={className + `${layout['flex']} ${layout['column']} ${layout['align-center']}`}>
      <div className={`${styles['card-login']} ${layout['flex']} ${layout['column']} ${layout['align-center']} ${layout['col-12']} ${layout['mb-2']}`}>
        <div className={`${layout['flex']} ${layout['justify-center']} ${layout['align-center']} ${layout['col-6']} ${layout['mt-5']} ${layout['mb-5']}`}>
          <img className={`${layout['image-responsive']}`} src={instagramTypoLogo} alt="instagram typography logo"/>
        </div>
        <form className={`${layout['flex']} ${layout['column']} ${layout['align-center']} ${layout['col-10']} ${layout['mb-4']}`} onSubmit={handleLogin}>
          <input className={`${styles['form-field']} ${layout['col-12']} ${layout['mb-1']}`}type="text" value={email} name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input className={`${styles['form-field']} ${layout['col-12']} ${layout['mb-3']}`} type="password" value={password} name="password"  placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button className={`${styles['form-button']} ${layout['col-12']}`} type="submit">Log In</button>
        </form>
        <div className={`${layout['flex']} ${layout['justify-center']} ${layout['align-center']} ${layout['col-10']} ${layout['mb-4']}`}>
          <div className={`${styles['bar']} ${layout['col-6']}`}></div>
          <p className={`${styles['or']} ${layout['mr-3']} ${layout['ml-3']} ${layout['text-center']}`}>OR</p>
          <div className={`${styles['bar']} ${layout['col-6']}`}></div>
        </div>
        <div className={`${layout['mb-4']}`}>
          <button className={`${styles['facebook-login-button']} ${layout['flex']} ${layout['align-center']}`}>
            <img className={`${layout['mr-1']}`} src={faceBookLogo} alt="facebook logo"/> Log in with Facebook
          </button>
        </div>
        {alert &&
          <div className={`${layout['col-10']} ${layout['mb-4']}`}>
            <p className={`${styles['alert']}`}>{alert}</p>
          </div>
        }
        <Link className={`${styles['forgot-password']} ${layout['mb-3']}`} to="#">Forgot Password?</Link>
      </div>
      <div className={`${styles['card-signin']} ${styles['signin-card']} ${layout['col-12']} ${layout['text-center']} ${layout['mb-3']}`}>
        <p>Don't have an account? <Link className={`${styles['signup-link']}`} to="/accounts/emailsignup">Sing up</Link></p>
      </div>
      <div className={`${layout['flex']} ${layout['column']} ${layout['align-center']} ${layout['text-center']} ${layout['mb-5']} ${layout['col-12']}`}>
        <p className={`${layout['mb-3']}`}>Get the app.</p>
        <div className={`${layout['flex']} ${layout['justify-center']} ${layout['col-10']}`}>
          <div className={`${layout['col-6']} ${layout['mr-2']}`}>
            <Link className={`${layout['col-12']}`} to="#">
              <img className={`${styles['badge']}`} src={appStoreBadge} alt="google play badge"/>
            </Link>
          </div>
          <div className={`${layout['col-6']}`}>
            <Link className={`${layout['col-12']}`} to="#">
              <img className={`${styles['badge']}`} src={googlePlayBadge} alt="google play badge"/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
