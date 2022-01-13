import jwtDecode from 'jwt-decode';
import {useHistory, useLocation} from 'react-router-dom';

import api from '../../services/api.js';

import styles from './createPost.module.scss';
import layout from '../../styles/layout.module.scss';

import checkMarkCircle from '../../assets/images/checkmark-circle-outline.svg';
import checkMarkCircleDisable from '../../assets/images/checkmark-circle-outline-disable.svg';
import closeCircle from '../../assets/images/close-circle-outline.svg';
import { useState } from 'react/cjs/react.development';


export default function CreatePost ({name, avatar, modal}) {
  const [post, setPost] = useState('');
  const [description, setDescription] = useState('');

  const token = localStorage.getItem('authorization');
  const decodedToken = token ? jwtDecode(token) : false;

  const history = useHistory();
  const location = useLocation();

  const handleCanel  = async function (event, cb) {
    event.preventDefault();

    if (modal) {
      modal();
    }

   return setPost('');
  };

  const handlePost = async function (event) {
    const file = event.target.files[0];

    const formData = new FormData();

    formData.append('picture', file);
    formData.append('description', description);

    return setPost(formData);
  }

  const handleSubmitPost = async function (event) {
    event.preventDefault();

    const postCreation = await api.post('/posts', post);

    if (postCreation.data._id) {
      return (`/${decodedToken.username}` === location.pathname) ? history.go(0): history.push(`/${decodedToken.username}`);
    }

    return console.log(postCreation.data);
  };

  return (
    <div className={`${styles['create-post-container']}`}>
      <div  className={`${layout['mb-1']}`}>
        <h1 className={`${styles['create-post-header'] } ${layout['text-center']}`}>Create new post</h1>
      </div>
      <div className={` ${layout['mb-2']}`}>
        <div className={` ${layout['flex']} ${layout['align-center']} ${layout['pl-1']} ${layout['pr-1']}`}>
          <div className={`${styles['avatar']} ${layout['mr-1']}`}>
            <img className={`${layout['image-responsive']} ${layout['image-round']}`} src={`${process.env.REACT_APP_API_URL}${avatar}`} alt="" />
          </div>
          <p>{name}</p>
        </div>
      </div>
      <div className={`${layout['pl-1']} ${layout['pr-1']} ${layout['mb-2']}`}>
        <form onSubmit={handleSubmitPost}>
          <textarea className={`${styles['text-area']}`} name="description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Write a caption..."></textarea>
          <input type="file" name="picture" id="picture" onChange={(event) => handlePost(event)} hidden />
          <div className={`${layout['flex']} ${layout['align-center']} ${layout['justify-between']}`}>
            <label className={`${styles['file-label']}`} htmlFor="picture">
              Chosse File
            </label>
            <div>
              {post ? (
                <button className={`${styles['form-button']}`} onClick={handleSubmitPost}>
                  <img src={checkMarkCircle} alt="" />
                </button>
              ) : (
                <button className={`${styles['form-button']}`} >
                  <img src={checkMarkCircleDisable} alt="" />
                </button>
              )}
              <button className={`${styles['form-button']} ${layout['ml-1']}`} onClick={handleCanel}>
                <img src={closeCircle} alt="" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
