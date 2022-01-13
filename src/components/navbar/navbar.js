import {useState, useEffect} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';

import api from '../../services/api.js';

import useAuth from '../../hooks/useAuth.js';

import {Modal, handleModal} from '../modal/modal.js';
import CreatePost from '../createPost/createPost.js';

import styles from './navbar.module.scss';
import layout from '../../styles/layout.module.scss';

import instagramTypoLogo from '../../assets/images/instagram-typo-logo.png';
import home from '../../assets/images/home-outline.svg';
import papperPlane from '../../assets/images/paper-plane-outline.svg';
import compass from '../../assets/images/compass-outline.svg';
import heart from '../../assets/images/heart-outline.svg';
import person from '../../assets/images/person-circle-outline.svg';
import bookmark from '../../assets/images/bookmark-outline.svg';
import settings from '../../assets/images/settings-outline.svg';
import repeat from '../../assets/images/repeat-outline.svg';
import addCircle from '../../assets/images/add-circle-outline.svg';

export default function Navbar () {
  const [user, setUser] = useState({});
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const {auth, signout} = useAuth();

  const active = dropdown ? `${styles['active']} ` : '';

  useEffect(() => {
    async function authMe () {
      const token = localStorage.getItem('authorization');

      if (token) {
        const user = await api.get('/auth/me');

        if (user.data.error) {
          return localStorage.removeItem('authorization');
        }

        return setUser(user.data.user);
      }

      return setUser({});
    }

    authMe();
  }, [auth]);

  const handleSignout = async function () {
    setDropdown(false);
    signout(() => {
      history.push('/');
    });
  };

  const handleSearch = async function (event) {
    if (event.key === "Enter") {
      history.push(`/${search}`);
      return setSearch('');
    }
  };

  if (!auth && location.pathname === '/')  {
    return null;
  }

  return (
    <>
      <Modal display={modal}>
        <CreatePost name={user.username} avatar={user.avatar} modal={() => handleModal(modal, setModal)} />
      </Modal>
      <nav className={`${styles['navbar']} ${layout['flex']} ${layout['align-center']} ${layout['justify-around']} ${layout['col-12']}`}>
        <div className={`${styles['instagram-typo-logo']} ${layout['mr-2']}`}>
          <Link to="/">
            <img className={`${layout['image-responsive']}`} src={instagramTypoLogo} alt="instagram typography logo"/>
          </Link>
        </div>
        <div className={`${layout['hide-sm']}`}>
          <input
            className={`${styles['search']}`}
            type="text"
            name="search"
            value={search}
            placeholder="Search"
            onChange={(event) => setSearch(event.target.value)}
            onKeyUp={handleSearch}
          />
        </div>
        <div className={`${layout['flex']} ${layout['align-center']}`}>
          {user.avatar ? (
            <>
            <div className={`${layout['mr-3']}`}>
            <Link to="/">
              <img src={home} alt=""/>
            </Link>
            </div>
            <div className={`${layout['mr-3']}`}>
              <Link to="#">
                <img src={papperPlane} alt=""/>
              </Link>
            </div>
            <div className={`${layout['mr-3']}`}>
              <img className={`${layout['pointer']}`} src={addCircle} alt="Create post button" onClick={() => handleModal(modal, setModal)} />
            </div>
            <div className={`${layout['mr-3']}`}>
              <Link to="#">
                <img src={compass} alt=""/>
              </Link>
            </div>
            <div className={`${layout['mr-3']}`}>
              <Link to="#">
                <img src={heart} alt=""/>
              </Link>
            </div>
            <div className={`${styles['avatar-dropdown']}`}>
              <div className={`${styles['avatar']}`} onClick={() => setDropdown(dropdown ? false : true)}>
                <img className={`${styles['avatar-image']}`} src={`${process.env.REACT_APP_API_URL}${user.avatar}`} alt=""/>
              </div>
              <div className={`${active}${styles['dropdown']}`}>
                <div className={`${styles['box']}`}></div>
                <Link className={`${styles['link']}`} to={`/${user.username}`}>
                  <div className={`${styles['dropdown-item']} ${layout['flex']} ${layout['align-center']}`}>
                    <div className={`${layout['mr-2']}`}>
                      <img className={`${layout['vertical-middle']}`} src={person} alt="profile icon"/>
                    </div>
                    <p className={`${styles['dropdown-text']}`}>Profile</p>
                  </div>
                </Link>
                <Link className={`${styles['link']}`} to="#">
                  <div className={`${styles['dropdown-item']} ${layout['flex']} ${layout['align-center']}`}>
                    <div className={`${layout['mr-2']}`}>
                      <img className={`${layout['vertical-middle']}`} src={bookmark} alt="profile icon"/>
                    </div>
                    <p className={`${styles['dropdown-text']}`}>Saved</p>
                  </div>
                </Link>
                <Link className={`${styles['link']}`} to="#">
                  <div className={`${styles['dropdown-item']} ${layout['flex']} ${layout['align-center']}`}>
                    <div className={`${layout['mr-2']}`}>
                      <img className={`${layout['vertical-middle']}`} src={settings} alt="profile icon"/>
                    </div>
                    <p className={`${styles['dropdown-text']}`}>Settings</p>
                  </div>
                </Link>
                <Link className={`${styles['link']}`} to="#">
                  <div className={`${styles['dropdown-item']} ${layout['flex']} ${layout['align-center']}`}>
                    <div className={`${layout['mr-2']}`}>
                      <img className={`${layout['vertical-middle']}`} src={repeat} alt="profile icon"/>
                    </div>
                    <p className={`${styles['dropdown-text']}`}>Switch Accounts</p>
                  </div>
                </Link>
                <button className={`${styles['dropdown-logout']}`} onClick={handleSignout}>Log Out</button>
              </div>
            </div>
            </>
          ) : (
            <div className={`${layout['flex']} ${layout['align-center']}`}>
              <Link className={`${layout['mr-2']}`} to="/accounts/login">
                <button className={`${styles['login-button']}`}>Log in</button>
              </Link>
              <Link className={`${styles['signup-link']}`} to="/accounts/emailsignup">Sign Up</Link>
            </div>
          )
          }
        </div>
      </nav>
    </>
  );
}
