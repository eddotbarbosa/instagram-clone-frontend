import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import api from '../../services/api.js';

import styles from './editProfile.module.scss';
import layout from '../../styles/layout.module.scss';

export default function EditProfile({modalHandler}) {
  const [avatar, setAvatar] = useState('/images/default-avatar.png');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [alert, setAlert] = useState('');

  const token = localStorage.getItem('authorization');
  const decodedToken = token ? jwtDecode(token) : '';

  useEffect(() => {
    async function getUser () {
      const user = await api.get(`/users/${decodedToken.username}`);

      if (user.data.username) {
        setAvatar(user.data.avatar);
        setName(user.data.name);
        setUsername(user.data.username);
        setWebsite(user.data.externalUrl);
        setBio(user.data.biography);
        setEmail(user.data.email);
        setPhone(user.data.phone);
        return setGender(user.data.gender);
      }

      return console.log(user.data);
    }

    getUser();
  }, [decodedToken.username]);

  const handleSubmit = async function (event) {
    event.preventDefault();

    const updateUser = await api.put('/users', {
      name: name,
      username: username,
      email: email,
      phone: phone,
      biography: bio,
      externalUrl: website,
      gender: gender
    });

    if (updateUser.data.username) {
      return setAlert('Profile Saved.');
    }

    console.log(updateUser.data);

    return setAlert('Error.');
  };

  return (
    <div className={`${layout['flex']} ${layout['column']} ${layout['align-center']} ${layout['col-12']}`}>
      <div className={`${layout['flex']} ${layout['justify-start']} ${layout['align-center']} ${layout['col-10']} ${layout['col-sm-11']} ${layout['mt-4']} ${layout['mb-2']}`}>
        <div className={`${layout['flex']} ${layout['justify-end']} ${layout['justify-sm-start']} ${layout['col-2']} ${layout['col-sm-1']} ${layout['mr-4']}`}>
          <div className={`${styles['avatar-image']}`}>
            <img className={`${layout['image-responsive']} ${layout['image-round']}`} src={`${process.env.REACT_APP_API_URL}${avatar}`} alt="account avatar" />
          </div>
        </div>
        <div className={`${layout['col-8']} ${layout['col-sm-11']}`}>
          <h1 className={`${styles['username-header']}`}>{username}</h1>
          <button className={`${styles['blue-button']}`} onClick={modalHandler}>Change Profile Photo</button>
        </div>
      </div>
      <form className={`${layout['col-10']} ${layout['col-sm-11']} ${layout['mb-4']}`} onSubmit={(event) => handleSubmit(event)}>
        <div className={`${layout['flex']} ${layout['wrap']} ${layout['justify-start']} ${layout['align-start']} ${layout['col-12']} ${layout['mb-3']}`}>
          <div className={`${layout['text-end']} ${layout['text-sm-start']} ${layout['col-2']} ${layout['col-sm-12']} ${layout['mr-4']} ${layout['mb-sm-1']}`}>
            <label className={`${styles['form-label']}`} htmlFor="form-name">Name</label>
          </div>
          <div className={`${layout['col-8']} ${layout['col-sm-12']}`}>
            <input id="form-name" className={`${styles['form-field']} ${layout['mb-2']}`} value={name} type="text" placeholder='Name' onChange={(event) => setName(event.target.value)}/>
            <div>
              <p className={`${styles['form-text']} ${layout['mb-2']}`}>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
              <p className={`${styles['form-text']}`}>You can only change your name twice within 14 days.</p>
            </div>
          </div>
        </div>
        <div className={`${layout['flex']} ${layout['wrap']} ${layout['justify-start']} ${layout['align-start']} ${layout['col-12']} ${layout['mb-3']}`}>
          <div className={`${layout['text-end']} ${layout['text-sm-start']} ${layout['col-2']} ${layout['col-sm-12']} ${layout['mr-4']} ${layout['mb-sm-1']}`}>
            <label className={`${styles['form-label']}`} htmlFor="form-username">Username</label>
          </div>
          <div className={`${layout['col-8']} ${layout['col-sm-12']}`}>
            <input id="form-username" className={`${styles['form-field']} ${layout['mb-2']}`} value={username} type="text" placeholder='User Name' onChange={(event) => setUsername(event.target.value)}/>
            <div>
              <p className={`${styles['form-text']}`}>In most cases, you'll be able to change your username back to eddotbarbosa for another 14 days. Learn More</p>
            </div>
          </div>
        </div>
        <div className={`${layout['flex']} ${layout['wrap']} ${layout['justify-start']} ${layout['align-start']} ${layout['col-12']} ${layout['mb-3']}`}>
          <div className={`${layout['text-end']} ${layout['text-sm-start']} ${layout['col-2']} ${layout['col-sm-12']} ${layout['mr-4']} ${layout['mb-sm-1']}`}>
            <label className={`${styles['form-label']}`} htmlFor="form-website">Website</label>
          </div>
          <div className={`${layout['col-8']} ${layout['col-sm-12']}`}>
            <input id="form-website" className={`${styles['form-field']}`} value={website} type="text" placeholder='Website' onChange={(event) => setWebsite(event.target.value)}/>
          </div>
        </div>
        <div className={`${layout['flex']} ${layout['wrap']} ${layout['justify-start']} ${layout['align-start']} ${layout['col-12']} ${layout['mb-3']}`}>
          <div className={`${layout['text-end']} ${layout['text-sm-start']} ${layout['col-2']} ${layout['col-sm-12']} ${layout['mr-4']} ${layout['mb-sm-1']}`}>
            <label className={`${styles['form-label']}`} htmlFor="form-bio">Bio</label>
          </div>
          <div className={`${layout['col-8']} ${layout['col-sm-12']}`}>
            <textarea  id="form-bio" className={`${styles['form-text-area']}`} name="bio" value={bio} onChange={(event) => setBio(event.target.value)}></textarea>
          </div>
        </div>
        <div className={`${layout['flex']} ${layout['wrap']} ${layout['justify-start']} ${layout['align-start']} ${layout['col-12']} ${layout['mb-2']}`}>
          <div className={`${layout['text-end']} ${layout['text-sm-start']} ${layout['col-2']} ${layout['col-sm-12']} ${layout['mr-4']}`}>
          </div>
          <div className={`${layout['col-8']} ${layout['col-sm-12']}`}>
            <h2 className={`${styles['form-header']}`}>Personal Information</h2>
            <p className={`${styles['form-text']}`}>Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.</p>
          </div>
        </div>
        <div className={`${layout['flex']} ${layout['wrap']} ${layout['justify-start']} ${layout['align-start']} ${layout['col-12']} ${layout['mb-3']}`}>
          <div className={`${layout['text-end']} ${layout['text-sm-start']} ${layout['col-2']} ${layout['col-sm-12']} ${layout['mr-4']} ${layout['mb-sm-1']}`}>
            <label className={`${styles['form-label']}`} htmlFor="form-email">Email</label>
          </div>
          <div className={`${layout['col-8']} ${layout['col-sm-12']}`}>
            <input id="form-email" className={`${styles['form-field']}`} type="text" value={email} placeholder='Email' onChange={(event) => setEmail(event.target.value)}/>
          </div>
        </div>
        <div className={`${layout['flex']} ${layout['wrap']} ${layout['justify-start']} ${layout['align-start']} ${layout['col-12']} ${layout['mb-3']}`}>
          <div className={`${layout['text-end']} ${layout['text-sm-start']} ${layout['col-2']} ${layout['col-sm-12']} ${layout['mr-4']} ${layout['mb-sm-1']}`}>
            <label className={`${styles['form-label']}`} htmlFor="form-phone-number">Phone Number</label>
          </div>
          <div className={`${layout['col-8']} ${layout['col-sm-12']}`}>
            <input id="form-phone-number" className={`${styles['form-field']}`} type="text" value={phone} placeholder='Phone Number' onChange={(event) => setPhone(event.target.value)}/>
          </div>
        </div>
        <div className={`${layout['flex']} ${layout['wrap']} ${layout['justify-start']} ${layout['align-start']} ${layout['col-12']} ${layout['mb-3']}`}>
          <div className={`${layout['text-end']} ${layout['text-sm-start']} ${layout['col-2']} ${layout['col-sm-12']} ${layout['mr-4']} ${layout['mb-sm-1']}`}>
            <label className={`${styles['form-label']}`} htmlFor="form-gender">Gender</label>
          </div>
          <div className={`${layout['col-8']} ${layout['col-sm-12']}`}>
            <select id="cars" name="cars" className={`${styles['form-field']}`} value={gender} onChange={(event) => setGender(event.target.value)}>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="not informed">not irformed</option>
            </select>
          </div>
        </div>
        <div className={`${layout['flex']} ${layout['wrap']} ${layout['justify-start']} ${layout['align-center']} ${layout['col-12']} ${layout['mb-4']}`}>
          <div className={`${layout['text-end']} ${layout['text-sm-start']} ${layout['text-sm-start']} ${layout['col-2']} ${layout['col-sm-12']} ${layout['col-sm-12']} ${layout['mr-4']} ${layout['mb-sm-1']}`}>
            <label className={`${styles['form-label']}`} htmlFor="similar-account-suggestions">Similar Account Suggestions</label>
          </div>
          <div className={`${layout['flex']} ${layout['align-center']} ${layout['col-8']} ${layout['col-sm-12']}`}>
            <input className={`${layout['mr-1']}`} type="checkbox" name="similar-account-suggestions" id="similar-account-suggestions" />
            <p className={`${styles['similar-accounts-text']}`}>Include your account when recommending similar accounts people might want to follow.<Link to="#">[?]</Link></p>
          </div>
        </div>
        <div className={`${layout['flex']} ${layout['justify-start']} ${layout['align-center']} ${layout['col-12']} ${layout['mb-2']}`}>
          <div className={`${layout['col-2']} ${layout['mr-4']} ${layout['hide-sm']}`}>
          </div>
          <div className={`${layout['flex']} ${layout['align-center']} ${layout['justify-between']} ${layout['col-8']} ${layout['col-sm-12']}`}>
            {(alert === 'Profile Saved.') ? (
              <span className={`${styles['alert']}`}>{alert}</span>
            ) : (
              <span className={`${styles['alert']} ${styles['error']}`}>{alert}</span>
            )}
          </div>
        </div>
        <div className={`${layout['flex']} ${layout['justify-start']} ${layout['align-center']} ${layout['col-12']} ${layout['mb-2']}`}>
          <div className={`${layout['col-2']} ${layout['mr-4']} ${layout['hide-sm']}`}>
          </div>
          <div className={`${layout['flex']} ${layout['align-center']} ${layout['justify-between']} ${layout['col-8']} ${layout['col-sm-12']}`}>
            <input className={`${styles['submit-button']}`} type="submit" value="Submit" />
            <button className={`${styles['blue-button']}`} onClick={(event) => event.preventDefault()}>Temporarily disable my account</button>
          </div>
        </div>
      </form>
    </div>
  );
}
