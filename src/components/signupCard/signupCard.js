import {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api.js';

import useAuth from '../../hooks/useAuth.js';

import styles from './signupCard.module.scss';
import layout from '../../styles/layout.module.scss';

import appStoreBadge from '../../assets/images/appstore-badge.png';
import googlePlayBadge from '../../assets/images/googleplay-badge.png';
import instagramTypoLogo from '../../assets/images/instagram-typo-logo.png';
import faceBookLogo from '../../assets/images/facebook-white.svg';

export default function SignupCard ({className}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');

  const history = useHistory();
  const {signin} = useAuth();

  const handleSignup = async function (event) {
    event.preventDefault();
    const signup = await api.post('/users', {
      name: name,
      username: username,
      email: email,
      password: password
    });

    if (signup.data.username) {
      return await signin(event, email, password, () => {
        history.push(`/${username}`);
      });
    }

    return setAlert(signup.data.error.message);
  }

  return (
    <div className={className + `${layout['flex']} ${layout['column']} ${layout['align-center']} ${layout['col-12']}`}>
      <div className={`${styles['card-signup']} ${layout['flex']} ${layout['column']} ${layout['align-center']} ${layout['col-12']} ${layout['mb-2']}`}>
        <div className={`${layout['flex']} ${layout['justify-center']} ${layout['align-center']} ${layout['col-6']} ${layout['mt-6']} ${layout['mb-3']}`}>
          <img className={`${layout['image-responsive']}`} src={instagramTypoLogo} alt="instagram typography logo"/>
        </div>
        <div className={`${layout['col-10']} ${layout['mb-3']}`}>
          <h2 className={`${styles['signup-card-header']}`}>Sign up to see photos and videos from your friends.</h2>
        </div>
        <div className={`${layout['mb-4']} ${layout['col-10']}`}>
          <button className={`${styles['facebook-login-button']} ${layout['flex']} ${layout['align-end']} ${layout['justify-center']} ${layout['col-12']}`}>
            <img className={`${layout['mr-1']}`} src={faceBookLogo} alt="facebook logo"/> Log in with Facebook
          </button>
        </div>
        <div className={`${layout['flex']} ${layout['justify-center']} ${layout['align-center']} ${layout['col-10']} ${layout['mb-4']}`}>
          <div className={`${styles['bar']} ${layout['col-6']}`}></div>
          <p className={`${styles['or']} ${layout['mr-1']} ${layout['ml-1']} ${layout['text-center']}`}>OR</p>
          <div className={`${styles['bar']} ${layout['col-6']}`}></div>
        </div>
        <form className={`${layout['flex']} ${layout['column']} ${layout['align-center']} ${layout['col-10']} ${layout['mb-4']}`} onSubmit={handleSignup}>
          <input className={`${styles['form-field']} ${layout['col-12']} ${layout['mb-1']}`} type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input className={`${styles['form-field']} ${layout['col-12']} ${layout['mb-1']}`} type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
          <input className={`${styles['form-field']} ${layout['col-12']} ${layout['mb-1']}`} type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input className={`${styles['form-field']} ${layout['col-12']} ${layout['mb-3']}`} type="password" name="password"  placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className={`${styles['form-button']} ${layout['col-12']}`} type="submit">Sign up</button>
        </form>
        {alert &&
          <div className={`${layout['col-10']} ${layout['mb-4']}`}>
            <p className={`${styles['alert']}`}>{alert}</p>
          </div>
        }
        <div className={`${layout['col-9']} ${layout['mb-6']}`}>
          <p className={`${styles['agree-alert']}`}>By signing up, you agree to our
            <a className={`${styles['agree-alert-link']}`} href="http://localhost:3000/#">Terms</a> ,
            <a className={`${styles['agree-alert-link']}`} href="http://localhost:3000/#">Data Policy</a> and
            <a className={`${styles['agree-alert-link']}`} href="http://localhost:3000/#">Cookies Policy</a> .
          </p>
        </div>
      </div>
      <div className={`${styles['card-login']} ${styles['signin-card']} ${layout['col-12']} ${layout['text-center']} ${layout['mb-3']}`}>
        <p>Have an account? <Link className={`${styles['login-link']}`} to="/accounts/login">Log In</Link></p>
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
