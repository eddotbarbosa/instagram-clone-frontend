import {useState, useEffect} from 'react';
import jwtDecode from 'jwt-decode';

import api from '../../services/api.js';

import styles from './followers.module.scss';
import layout from '../../styles/layout.module.scss';

import closeOutline from '../../assets/images/close-outline.svg';

export default function Followers ({profile, target, handleModal}) {
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [loggedUser, setLoggedUser] = useState();
  const [reload, setReload] = useState(false);

  const token = localStorage.getItem('authorization');
  const decodedToken = token ? jwtDecode(token) : false;

  useEffect(() => {
    async function getFollowers () {
      if (decodedToken) {
        const profile = await api.get(`/users/${decodedToken.username}`);

        setLoggedUser(profile.data);
      }

      if (target === 'Followers') {
        const followers = await api.get(`/users/${profile.username}/followers`);

        setFollowers(followers.data.followers);

        return setLoading(false);
      }

      if (target === 'Following') {
        const followers = await api.get(`/users/${profile.username}/following`);

        setFollowers(followers.data.following);

        return setLoading(false);
      }
    }

    getFollowers();
  }, [reload, target, profile.username, decodedToken]);

  if (loading) {
    return null;
  }

  const handleFollow = async function (user) {
    await api.post('/users/follow', {
      username: user
    });

    return setReload(reload ? false : true);
  }

  const handleUnfollow = async function (user) {
    await api.post('/users/unfollow', {
      username: user
    });

    return setReload(reload ? false : true);
  }

  return (
    <div>
      <div className={`${styles['followers-header']} ${layout['flex']} ${layout['justify-between']} ${layout['align-center']}`}>
        <div className={`${styles['header-box']}`}></div>
        <h2>{target}</h2>
        <div className={`${layout['flex']} ${layout['pointer']}`} onClick={handleModal}>
          <img className={`${layout['pr-1']}`} src={closeOutline} alt="close followers button" />
        </div>
      </div>
      <div className={`${styles['followers-container']}`}>
        {followers.map((follower) => {
          return (
            <ul key={follower._id} className={`${styles['followers-list']}`}>
              <li className={`${styles['followers-list-item']} ${layout['flex']} ${layout['justify-between']} ${layout['align-center']}`}>
                <div className={`${layout['followers-container']} ${layout['flex']} ${layout['align-center']}`}>
                  <div className={`${styles['followers-avatar']} ${layout['flex']} ${layout['mr-2']}`}>
                    <img className={`${layout['image-responsive']} ${layout['image-round']}`} src={`${process.env.REACT_APP_API_URL}${follower.avatar}`} alt="user avatar" />
                  </div>
                  <div>
                    <div>
                      <span>
                        <a className={`${styles['followers-link']}`} href={`/${follower.username}`}>{follower.username}</a>
                      </span>
                    </div>
                    <div>
                      <span className={`${styles['followers-name']}`}>{follower.name}</span>
                    </div>
                  </div>
                </div>
                <div>
                  {loggedUser.following.find((element) => element === follower._id) ? (
                    <button className={`${styles['button-white']}`} onClick={() => handleUnfollow(follower.username)}>Unfollow</button>
                  ) : (
                    <button className={`${styles['button-white']}`} onClick={() => handleFollow(follower.username)}>Follow</button>
                  )}
                </div>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
