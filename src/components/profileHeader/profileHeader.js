import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import api from '../../services/api.js';

import {Modal, ModalButton, handleModal} from '../modal/modal.js';
import Followers from '../followers/followers.js';

import styles from './profileHeader.module.scss';
import layout from '../../styles/layout.module.scss';

import settings from '../../assets/images/settings-outline.svg';
import ellipsis from '../../assets/images/ellipsis.svg';

export default function ProfileCard ({className}) {
  const [profile, setProfile] = useState({});
  const [followersTarget, setFollowersTarget] = useState('');
  const [settingsModal, setSettingsModal] = useState(false);
  const [followersModal, setFollowersModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [checkFollow, setCheckFollow] = useState('');

  const {username} = useParams();

  const token = localStorage.getItem('authorization');
  const decodedToken = token ? jwtDecode(token) : false;

  useEffect(() => {
    async function getProfile () {
      const profile = await api.get(`/users/${username}`);

      if (profile.data.username) {
        setProfile(profile.data);

        if (decodedToken._id) {
          const check = profile.data.followers.find((element) => element === decodedToken._id);

          return check ? setCheckFollow(true) : setCheckFollow(false);
        }
      }
    }

    getProfile();
  }, [username, checkFollow, decodedToken._id]);

  const handleFollow = async function () {
    const follow = await api.post('/users/follow', {
      username: username
    });

    if (follow.data.result === 'user successfully followed!') {
      return setCheckFollow(true)
    }

    return console.log(follow.data);
  }

  const handleUnfollow = async function () {
    const Unfollow = await api.post('/users/unfollow', {
      username: username
    });

    if (Unfollow.data.result === 'user successfully unfollowed!') {
      return setCheckFollow(false);
    }

    return console.log(Unfollow.data);
  }

  if (!profile.username) {
    return null;
  }

  return (
    <>
    <Modal display={followersModal}>
      <Followers profile={profile} target={followersTarget} handleModal={() => handleModal(followersModal, setFollowersModal)} />
    </Modal>
    <Modal display={settingsModal}>
      <ModalButton>Change Password</ModalButton>
      <ModalButton>Nametag</ModalButton>
      <ModalButton>Apps and Websites</ModalButton>
      <ModalButton>Notifications</ModalButton>
      <ModalButton>Privacy and Security</ModalButton>
      <ModalButton>Login Activity</ModalButton>
      <ModalButton>Emails from Instagram</ModalButton>
      <ModalButton>Report a Problem</ModalButton>
      <ModalButton>Log Out</ModalButton>
      <ModalButton onClick={() => handleModal(settingsModal, setSettingsModal)}>Cancel</ModalButton>
    </Modal>
    <Modal display={userModal}>
      <ModalButton color='red'>Block this user</ModalButton>
      <ModalButton color='red'>Restrict</ModalButton>
      <ModalButton color='red'>Report user</ModalButton>
      <ModalButton onClick={() => handleModal(userModal, setUserModal)}>Cancel</ModalButton>
    </Modal>
    <div className={className + `${layout['flex']} ${layout['justify-center']} ${layout['align-start']} ${layout['col-12']}`}>
      <div className={`${layout['flex']} ${layout['justify-center']} ${layout['align-center']} ${layout['col-4']} ${layout['hide-sm']}`}>
        <div className={`${styles['profile-image']}`}>
          <img className={`${layout['image-responsive']} ${layout['image-round']}`} src={`${process.env.REACT_APP_API_URL}${profile.avatar}`} alt="avatar"/>
        </div>
      </div>
      <div className={`${styles['profile-infos']} ${layout['flex']} ${layout['column']} ${layout['col-8']} ${layout['col-sm-12']}`}>
        <div className={`${styles['profile-header']} ${layout['flex']} ${layout['align-center']} ${layout['align-center']} ${layout['col-12']} ${layout['mb-3']}`}>
          <div className={`${styles['profile-image-small']} ${layout['mr-2']} ${layout['hide']} ${layout['show-sm']}`}>
            <img className={`${layout['image-responsive']} ${layout['image-round']}`} src={`${process.env.REACT_APP_API_URL}${profile.avatar}`} alt="avatar"/>
          </div>
          {decodedToken.username === username
          ?
          <div className={`${layout['flex']} ${layout['align-center']}  ${layout['wrap']} ${layout['col-11']}`}>
            <h2 className={`${styles['username']} ${layout['mr-3']}`}>{profile.username}</h2>
            <div className={`${styles['edit-profile']} ${layout['order-sm-3']}`}>
            <Link to="/accounts/edit">
              <button className={`${styles['edit-profile-button']}`}>Edit Profile</button>
            </Link>
            </div>
            <div>
              <button className={`${styles['settings-button']}`}>
                <img className={`${styles['settings-button-image']}`} src={settings} alt="settings icon" onClick={() => handleModal(settingsModal, setSettingsModal)}/>
              </button>
            </div>
          </div>
          :
          <div className={`${layout['flex']} ${layout['align-center']}  ${layout['wrap']} ${layout['col-11']}`}>
            <h2 className={`${styles['username']} ${layout['mr-3']}`}>{profile.username}</h2>
            <div className={`${styles['edit-profile']} ${layout['order-sm-3']}`}>
            {checkFollow
            ?
            <button className={`${styles['un']} ${styles['follow-button']}`} onClick={handleUnfollow}>Unfollow</button>
            :
            <button className={`${styles['follow-button']}`} onClick={handleFollow}>Follow</button>
            }
            </div>
            <div>
              <button className={`${styles['settings-button']}`}>
                <img className={`${styles['settings-button-image']}`} src={ellipsis} alt="settings icon" onClick={() => handleModal(userModal, setUserModal)}/>
              </button>
            </div>
          </div>
          }
        </div>
        <ul className={`${styles['list']} ${layout['flex']} ${layout['col-12']} ${layout['mb-3']} ${layout['order-sm-3']}`}>
          <li className={`${styles['list-item']} ${layout['mr-3']}`}>
            <span className={`${layout['bold']}`}>{profile.posts.length} </span>
            <span className={`${layout['lighter']}`}>Posts</span>
          </li>
          <li className={`${styles['list-item']} ${layout['mr-3']} ${layout['pointer']}`} onClick={() => {setFollowersTarget('Followers'); handleModal(followersModal, setFollowersModal)}}>
            <span className={`${layout['bold']}`}>{profile.followers.length} </span>
            <span className={`${layout['lighter']}`}>Followers</span>
          </li>
          <li className={`${layout['pointer']}`} onClick={() => {setFollowersTarget('Following'); handleModal(followersModal, setFollowersModal)}}>
            <span className={`${styles['list-item']} ${layout['bold']}`}>{profile.following.length} </span>
            <span className={`${layout['lighter']}`}>Following</span>
          </li>
        </ul>
        <div className={`${styles['profile-bio']} ${layout['col-12']}`}>
          <h1 className={`${styles['name']}`}>{profile.name}</h1>
          <span>{profile.biography}</span>
          <div>
            <a className={`${styles['website']}`} href={profile.externalUrl}>{profile.externalUrl.replace(/(^\w+:|^)\/\//, '')}</a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
