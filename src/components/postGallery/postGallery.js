import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';

import api from '../../services/api.js';

import styles from './postGallery.module.scss';
import layout from '../../styles/layout.module.scss';

import person from '../../assets/images/person-outline.svg';
import bookmark from '../../assets/images/bookmark-outline-gray.svg';
import apps from '../../assets/images/apps-outline.svg';
import heart from '../../assets/images/heart.svg';
import chatBubble from '../../assets/images/chatbubble.svg';

export default function PostGalery ({className}) {
  const [post, setpost] = useState([]);

  const {username} = useParams();

  useEffect(() => {
    async function getposts () {
      const posts = await api.get(`/posts/list/${username}`);

      const postRow = [];

      for (let i = 0; i < posts.data.length; i+=3) {
        postRow.push(posts.data.slice(i, i+3));
      }

      return setpost(postRow);
    }

    getposts();
  }, [username]);


  return (
    <div className={className + `${styles['post-gallery-container']} ${layout['flex']} ${layout['column']}`}>
      <div className={`${styles['tag-container']} ${layout['flex']} ${layout['justify-center']}`}>
        <div className={`${styles['tag']} ${styles['active']} ${layout['flex']} ${layout['align-center']} ${layout['mr-5']}`}>
          <div className={`${layout['mr-1']}`}>
            <img src={apps} alt="user icon"/>
          </div>
          <span className={`${styles['tag-text']} ${styles['active']} ${layout['hide-sm']}`}>POSTS</span>
        </div>
        <div className={`${styles['tag']} ${layout['flex']} ${layout['align-center']} ${layout['mr-5']}`}>
          <div className={`${layout['mr-1']}`}>
            <img width="12px" height="12px" src={bookmark} alt="user icon"/>
          </div>
          <span className={`${styles['tag-text']} ${layout['hide-sm']}`}>SAVED</span>
        </div>
        <div className={`${styles['tag']} ${layout['flex']} ${layout['align-center']}`}>
          <div className={`${layout['mr-1']}`}>
            <img src={person} alt="user icon"/>
          </div>
          <span className={`${styles['tag-text']} ${layout['hide-sm']}`}>TAGGED</span>
        </div>
      </div>
      <div className={`${layout['flex']} ${layout['column']}`}>
        {post.map(post => {
          return (
            <div key={`${post[0]._id}`} className={`${styles['post-row']}`}>
              <div className={`${styles['post']} ${styles['mr']}`}>
                <Link to={`/p/${post[0]._id}`}>
                  <div className={`${styles['post-overlay']}`}>
                    <div className={`${layout['flex']} ${layout['align-center']}`}>
                      <div className={`${layout['mr-1']}`}>
                        <img className={`${layout['vertical-middle']}`} src={heart} alt=""/>
                      </div>
                      <span className={`${styles['post-overlay-text']} ${layout['mr-1']}`}>{post[0].likes.length > 0 ? post[0].likes.length : 0}</span>
                    </div>
                    <div className={`${layout['flex']} ${layout['align-center']}`}>
                      <div className={`${layout['mr-1']}`}>
                        <img className={`${layout['vertical-middle']}`} src={chatBubble} alt=""/>
                      </div>
                      <span className={`${styles['post-overlay-text']}`}>{post[0].comments.length > 0 ? post[0].comments.length : 0}</span>
                    </div>
                  </div>
                  <img className={`${layout['image-responsive']}`} src={`${process.env.REACT_APP_API_URL}${post[0].image}`} alt=""/>
                </Link>
              </div>
              <div className={`${styles['post']} ${styles['mr']}`}>
                {post[1] &&
                  <Link to={`/p/${post[1]._id}`}>
                    <div className={`${styles['post-overlay']}`}>
                      <div className={`${layout['flex']} ${layout['align-center']}`}>
                        <div className={`${layout['mr-1']}`}>
                          <img className={`${layout['vertical-middle']}`} src={heart} alt=""/>
                        </div>
                        <span className={`${styles['post-overlay-text']} ${layout['mr-1']}`}>{post[1].likes.length > 0 ? post[1].likes.length : 0}</span>
                      </div>
                      <div className={`${layout['flex']} ${layout['align-center']}`}>
                        <div className={`${layout['mr-1']}`}>
                          <img className={`${layout['vertical-middle']}`} src={chatBubble} alt=""/>
                        </div>
                        <span className={`${styles['post-overlay-text']}`}>{post[1].comments.length > 0 ? post[1].comments.length : 0}</span>
                      </div>
                    </div>
                    <img className={`${layout['image-responsive']}`} src={`${process.env.REACT_APP_API_URL}${post[1].image}`} alt=""/>
                  </Link>
                }
              </div>
              <div className={`${styles['post']}`}>
                {post[2] &&
                  <Link to={`/p/${post[2]._id}`}>
                    <div className={`${styles['post-overlay']}`}>
                      <div className={`${layout['flex']} ${layout['align-center']}`}>
                        <div className={`${layout['mr-1']}`}>
                          <img className={`${layout['vertical-middle']}`} src={heart} alt=""/>
                        </div>
                        <span className={`${styles['post-overlay-text']} ${layout['mr-1']}`}>{post[2].likes.length > 0 ? post[2].likes.length : 0}</span>
                      </div>
                      <div className={`${layout['flex']} ${layout['align-center']}`}>
                        <div className={`${layout['mr-1']}`}>
                          <img className={`${layout['vertical-middle']}`} src={chatBubble} alt=""/>
                        </div>
                        <span className={`${styles['post-overlay-text']}`}>{post[2].comments.length > 0 ? post[2].comments.length : 0}</span>
                      </div>
                    </div>
                    <img className={`${layout['image-responsive']}`} src={`${process.env.REACT_APP_API_URL}${post[2].image}`} alt=""/>
                  </Link>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
