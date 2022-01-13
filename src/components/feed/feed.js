import {useState, useEffect} from 'react';
import jwtDecode from 'jwt-decode';

import api from '../../services/api.js';

import styles from './feed.module.scss';
import layout from '../../styles/layout.module.scss';

import {Modal, handleModal, ModalButton} from '../modal/modal.js';

import ellipsis from '../../assets/images/ellipsis.svg';
import heartOutline from '../../assets/images/heart-outline.svg';
import heartRed from '../../assets/images/heart-red.svg';
import chatBubbleOutline from '../../assets/images/chatbubble-outline.svg';
import paperPlane from '../../assets/images/paper-plane-outline.svg';
import bookMark from '../../assets/images/bookmark-outline.svg';
import happy from '../../assets/images/happy-outline.svg';
import arrowDown from '../../assets/images/arrow-down-circle-outline.svg';


export default function Feed () {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState('');
  const [reload, setReload] = useState(false);

  const token = localStorage.getItem('authorization');
  const decodedToken = token ? jwtDecode(token) : false;

  useEffect(() => {
    async function getFeed () {
      const getFeed = await api.get(`/users/feed`);

      if (getFeed.data.result) {
        setFeed(getFeed.data);

        return setLoading(false);
      }

      return console.log(getFeed.data);
    }

    getFeed();
  }, [reload]);

  const handleMore = async function () {
    if (feed.paging.next !== 'no next') {
      const more = await api.get(`/users/feed?${feed.paging.next}`);

      return setFeed({
        paging: more.data.paging,
        result: [...feed.result, ...more.data.result]
      });
    }

    return console.log(feed);
  }

  const handleComment = async function (event, postid) {
    event.preventDefault();

    const sendComment = await api.post('/comments', {
      post: postid,
      comment: comment
    });

    setReload(reload ? false : true);

    return console.log(sendComment.data);
  };

  const handleLike = async function (event, postid) {
    event.preventDefault();

    const like = await api.post('/posts/like', {
      post: postid
    });

    setReload(reload ? false : true);

    return console.log(like.data);
  };

  const checkLike = function (post) {
    const checkLike = post.likes.find((ele) => ele === decodedToken._id);

    return checkLike ? true : false;
  }

  if (loading) {
    return null;
  }

  return (
    <>
    <Modal display={modal}>
      <ModalButton color={'red'}>Report</ModalButton>
      <ModalButton color={'red'}>Unfollow</ModalButton>
      <ModalButton>Go to post</ModalButton>
      <ModalButton>share to...</ModalButton>
      <ModalButton>Copy Link</ModalButton>
      <ModalButton>Embed</ModalButton>
      <ModalButton onClick={() => handleModal(modal, setModal)}>Cancel</ModalButton>
    </Modal>
    <div className={`${layout['flex']} ${layout['column']} ${layout['align-center']} ${layout['col-12']}`}>
      {feed.result.map((post) => {
        return (
          <div key={post._id} className={`${styles['post-card']} ${layout['mb-4']}`}>
            <div className={`${styles['post-card-header']} ${layout['pt-3']} ${layout['pr-2']} ${layout['pb-3']} ${layout['pl-2']}`}>
              <div className={`${layout['flex']} ${layout['justify-between']} ${layout['align-center']}`}>
                <div className={`${layout['flex']} ${layout['justify-center']} ${layout['align-center']}`}>
                  <div className={`${styles['avatar']} ${layout['flex']} ${layout['mr-2']}`}>
                    <img className={`${layout['image-responsive']} ${layout['image-round']}`} src={`${process.env.REACT_APP_API_URL}${post.author.avatar}`} alt="" />
                  </div>
                  <span>
                    <a className={`${styles['link']}`} href={`/${post.author.username}`}>{post.author.username}</a>
                  </span>
                </div>
                <div>
                  <button className={`${styles['settings-button']}`} onClick={() => handleModal(modal, setModal)}>
                    <img src={ellipsis} alt="post settings button" />
                  </button>
                </div>
              </div>
            </div>
            <div className={`${layout['flex']} ${layout['col-12']}`}>
              <img className={`${layout['image-responsive']}`} src={`${process.env.REACT_APP_API_URL}${post.image}`} alt="post"/>
            </div>
            <div className={`${styles['card-bottom']} ${layout['col-12']}`}>
              <div className={`${layout['flex']} ${layout['justify-between']} ${layout['align-center']} ${layout['pt-1']} ${layout['pr-2']} ${layout['pb-1']} ${layout['pl-2']}`}>
                <div className={`${styles['button-icon']} ${layout['flex']} ${layout['align-center']} ${layout['mb-1']}`}>
                  <div className={`${layout['mr-1']}`}>
                    <button className={`${styles['button-icon']} ${layout['flex']} ${layout['pointer']}`} onClick={(event) => handleLike(event, post._id)}>
                      {checkLike(post) ? (
                        <img src={heartRed} alt=""/>
                      ) : (
                        <img src={heartOutline} alt=""/>
                      )}
                    </button>
                  </div>
                  <div className={`${layout['mr-1']}`}>
                    <button className={`${styles['button-icon']} ${layout['flex']}`}>
                      <img src={chatBubbleOutline} alt=""/>
                    </button>
                  </div>
                  <div className={`${layout['mr-1']}`}>
                    <button className={`${styles['button-icon']} ${layout['flex']}`}>
                      <img src={paperPlane} alt=""/>
                    </button>
                  </div>
                </div>
                <div>
                  <button className={`${styles['button-icon']} ${layout['flex']}`}>
                    <img src={bookMark} alt="" />
                  </button>
                </div>
              </div>
              <div className={`${layout['pl-2']}`}>
                <span className={`${styles['likes']}`}>{post.likes.length} likes</span>
              </div>
              <div className={`${layout['pt-1']} ${layout['pr-2']} ${layout['pb-1']} ${layout['pl-2']}`}>
                <div className={`${layout['mb-1']}`}>
                  <span className={`${layout['mr-1']}`}>
                    <a className={`${styles['link']}`} href={`/${post.author.username}`}>{post.author.username}</a>
                  </span>
                  <span>
                    {post.description}
                  </span>
                </div>
                <div>
                  <a className={`${styles['link-comment']}`} href={`/p/${post._id}`}>View all {post.comments.length} comments</a>
                </div>
              </div>
              <div className={`${layout['col-12']} ${layout['mb-4']}`}>
                <span className={`${styles['post-date']} ${layout['pl-2']}`}>
                  {new Date(post.createdAt).toLocaleDateString('pt-br').replace(/\//g, ' ')}
                </span>
              </div>
              <div className={`${styles['form-div']} ${layout['flex']} ${layout['col-12']} ${layout['pt-3']} ${layout['pr-2']} ${layout['pb-3']} ${layout['pl-2']}`}>
                <div className={`${layout['flex']} ${layout['pr-1']}`}>
                  <img src={happy} alt="smile"/>
                </div>
                <form className={`${layout['flex']} ${layout['col-12']}`} onSubmit={(event) => handleComment(event, post._id)}>
                  <input className={`${styles['form-field']}`} type="text" placeholder='Add a comment' value={comment} onChange={(event) => setComment(event.target.value)}/>
                  <input className={`${styles['submit-button']}`} type="submit" value="post" />
                </form>
              </div>
            </div>
          </div>
        )
      })}
      {feed.paging.next === 'no next' ? (
        null
      ) : (
        <div>
          <button className={`${styles['button-feed']} ${layout['mb-3']}`} onClick={handleMore}>
            <img src={arrowDown} alt="more button"/>
          </button>
        </div>
      )}
    </div>
    </>
  );
}
