import {useState, useEffect} from 'react';
import {useParams, Link, useHistory} from 'react-router-dom';
import jwtDecode from "jwt-decode";

import {Modal, ModalButton, handleModal} from '../modal/modal.js';

import api from '../../services/api.js';

import styles from './postCard.module.scss';
import layout from '../../styles/layout.module.scss';

import ellipsis from '../../assets/images/ellipsis.svg';
import heart from '../../assets/images/heart-outline.svg';
import heartRed from '../../assets/images/heart-red.svg';
import chatBubble from '../../assets/images/chatbubble-outline.svg';
import paperPlane from '../../assets/images/paper-plane-outline.svg';
import bookmark from '../../assets/images/bookmark-outline.svg';
import happy from '../../assets/images/happy-outline.svg';

export default function PostCard ({className}) {
  const {postid} = useParams();

  const [post, setPost] = useState({});
  const [comment, setComment] = useState('');
  const [commentModal, setCommentModal] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [like, setLike] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [reload, setReload] = useState(false);

  const history = useHistory();

  const token = localStorage.getItem('authorization');
  const decodedToken = token ? jwtDecode(token) : false;

  useEffect(() => {
    async function getPost () {
      const getPost = await api.get(`/posts/${postid}`);

      if (!getPost.data.image) return console.log(getPost.data);

      const checkLike = getPost.data.likes.find((ele) => ele === decodedToken._id);

      checkLike ? setLike(true) : setLike(false);

      setReload(false);

      return setPost(getPost.data);
    }

    getPost();
  }, [postid, reload, decodedToken._id]);

  if (!post.author) return null;

  const handlePostLike = async function (event) {
    event.preventDefault();

    const like = await api.post('/posts/like', {
      post: postid
    });

    setReload(reload ? false : true);

    return console.log(like.data);
  };

  const handleComment = async function (event) {
    event.preventDefault();

    const sendComment = await api.post('/comments', {
      post: postid,
      comment: comment
    });

    setReload(reload ? false : true);

    return console.log(sendComment.data);
  };

  const handleDeletePost = async function (event, id) {
    event.preventDefault();

    const deletePost = await api.delete('/posts', {
      data: {
        post: id
      }
    });

    if (deletePost.data.result === 'post successfully deleted!') {
      return history.push(`/${decodedToken.username}`);
    }

    return console.log(deletePost.data);
  }

  const HandleDeleteComment = async function (event, id) {
    event.preventDefault();

    const deletePostComment = await api.delete('/comments', {
      data: {
        comment: id
      }
    });

    if (deletePostComment.data.result === 'comment successfully deleted!') {
      setCommentModal(false);
    }

    return setReload(true);
  }

  return (
    <>
    <Modal display={postModal}>
      <ModalButton color={'red'} onClick={(event) => handleDeletePost(event, post._id)}>Delete</ModalButton>
      <ModalButton>Share to...</ModalButton>
      <ModalButton>Copy Link</ModalButton>
      <ModalButton>Embed</ModalButton>
      <ModalButton onClick={() => handleModal(postModal, setPostModal)}>Cancel</ModalButton>
    </Modal>
    <Modal display={commentModal}>
      <ModalButton color={'red'}>Report</ModalButton>
      <ModalButton color={'red'} onClick={(event) => HandleDeleteComment(event, commentId)}>Delete</ModalButton>
      <ModalButton onClick={() => handleModal(commentModal, setCommentModal)}>Cancel</ModalButton>
    </Modal>
    <div className={className  + `${styles['main-container']} ${layout['flex']} ${layout['wrap']} ${layout['mb-4']}`}>
      <div className={`${layout['flex']} ${layout['align-center']} ${layout['col-8']} ${layout['col-md-12']}`}>
        <img  className={`${layout['image-responsive']}`} src={`${process.env.REACT_APP_API_URL}${post.image}`} alt=""/>
      </div>
      <div className={`${layout['col-4']} ${layout['col-md-12']} ${layout['column']} ${layout['wrap']}`}>
        <div className={`${styles['post-header']} ${layout['flex']} ${layout['align-center']} ${layout['justify-between']} ${layout['col-12']}`}>
          <div className={`${styles['profile-image']} ${layout['mr-1']}`}>
            <img className={`${layout['image-responsive']} ${layout['image-round']}`} src={`${process.env.REACT_APP_API_URL}${post.author.avatar}`} alt="post author avatar"/>
          </div>
          <div className={`${layout['flex']} ${layout['col-12']} ${layout['justify-between']} ${layout['align-center']}`}>
            <span>
              <Link className={`${styles['black-link']}`} to={`/${post.author.username}`}>{post.author.username}</Link>
            </span>
            <button className={`${styles['text-button']}`} onClick={() => handleModal(postModal, setPostModal)}>
              <img src={ellipsis} width="15px" height="15px" alt="comment like button"/>
            </button>
          </div>
        </div>
        <div>
          <ul className={`${styles['comment-list']} ${layout['column']}`}>
            <div className={`${styles['post-description']} ${layout['flex']} ${layout['align-start']} ${layout['justify-between']} ${layout['col-12']}`}>
              <div className={`${styles['profile-image']} ${layout['mr-1']}`}>
                <img className={`${layout['image-responsive']} ${layout['image-round']}`} src={`${process.env.REACT_APP_API_URL}${post.author.avatar}`} alt="post author avatar"/>
              </div>
              <div className={`${layout['flex']} ${layout['wrap']} ${layout['col-12']} ${layout['justify-between']} ${layout['align-center']}`}>
                <span className={`${layout['col-12']}`}>
                  <span className={`${layout['mr-1']}`}>
                    <Link to={`/${post.author.username}`} className={`${styles['black-link']}`}>{post.author.username}</Link>
                  </span>
                  {post.description}
                </span>
                <div>
                  <span className={`${styles['date']}`}>{new Date(post.createdAt).toLocaleDateString('pt-br').replace(/\//g, ' ')}</span>
                </div>
              </div>
            </div>
            {post.comments.map(comment => {
              return (
                <li key={comment._id} className={`${layout['flex']}`}>
                  <div className={`${styles['post-description']} ${layout['flex']} ${layout['align-start']} ${layout['justify-between']} ${layout['col-12']}`}>
                    <div className={`${styles['profile-image']} ${layout['mr-1']}`}>
                      <img className={`${layout['image-responsive']} ${layout['image-round']}`} src={`${process.env.REACT_APP_API_URL}${comment.author.avatar}`} alt="post author avatar"/>
                    </div>
                    <div className={`${layout['flex']} ${layout['wrap']} ${layout['col-12']} ${layout['justify-between']} ${layout['align-center']}`}>
                      <span className={`${layout['col-12']}`}>
                        <span className={`${layout['mr-1']}`}>
                          <Link to={`/${post.author.username}`} className={`${styles['black-link']}`}>{post.author.username}</Link>
                        </span>
                        {comment.comment}
                      </span>
                      <div>
                        <span className={`${styles['date']} ${layout['mr-1']}`}>{new Date(comment.createdAt).toLocaleDateString('pt-br').replace(/\//g, ' ')}</span>
                        <button className={`${layout['mr-1']} ${styles['text-button']}`}>0 likes</button>
                        <button className={`${styles['text-button']}`}>Reply</button>
                      </div>
                    </div>
                    <div className={`${layout['flex']}`}>
                      <button className={`${styles['text-button']} ${layout['ml-1']} ${layout['mr-1']}`} onClick={() => handleModal(commentModal, setCommentModal)}>
                        <img src={ellipsis} width="15px" height="15px" alt="comment setting button" onClick={() => setCommentId(comment._id)}/>
                      </button>
                      <button className={`${styles['text-button']}`}><img src={heart} width="15px" height="15px" alt="comment like button"/></button>
                    </div>
                  </div>
               </li>
              );
            })}
          </ul>
        </div>
        <div className={`${styles['picture-infos']} ${layout['flex']} ${layout['column']}`}>
          <div className={`${layout['flex']} ${layout['justify-between']} ${layout['mb-1']}`}>
            <div>
              <button className={`${styles['icon-button']} ${layout['mr-1']}`} onClick={handlePostLike}>
                {like ? (
                  <img src={heartRed} alt="like button"/>
                ) : (
                  <img src={heart} alt="like button"/>
                )}
              </button>
              <button className={`${styles['icon-button']} ${layout['mr-1']}`}>
                <img src={chatBubble} alt="comment button"/>
              </button>
              <button className={`${styles['icon-button']}`}>
                <img src={paperPlane} alt="paper plane button"/>
              </button>
            </div>
            <div>
              <button className={`${styles['icon-button']}`}>
                <img src={bookmark} alt="bookmark button"/>
              </button>
            </div>
          </div>
          <div className={`${layout['flex']} ${layout['column']} ${layout['align-start']} ${layout['col-12']}`}>
            <div className={`${layout['flex']} ${layout['align-center']} ${layout['col-12']} ${layout['mb-1']}`}>
              <div className={`${styles['profile-image']} ${layout['mr-1']}`}>
                <img className={`${layout['image-responsive']} ${layout['image-round']}`} src={`${process.env.REACT_APP_API_URL}${post.author.avatar}`} alt="post author avatar"/>
              </div>
              <div className={`${layout['flex']} ${layout['wrap']} ${layout['col-12']} ${layout['justify-between']} ${layout['align-center']}`}>
                <span className={`${layout['col-12']} ${layout['mr-1']}`}>
                  Lyked by
                  <Link className={`${styles['likes-counter']} ${layout['mr-1']}`} to={`/p/${post._id}`}> {post.likes.length}</Link>
                </span>
              </div>
            </div>
            <div>
              <span className={`${styles['date']} ${layout['mr-1']}`}>{new Date(post.createdAt).toLocaleDateString('pt-br').replace(/\//g, ' ')}</span>
            </div>
          </div>
        </div>
        <div className={`${styles['comment']}`}>
          <form className={`${layout['flex']} ${layout['align-center']}`} onSubmit={handleComment}>
            <button className={`${styles['icon-button']} ${layout['mr-1']}`}>
              <img src={happy} alt="emotes button"/>
            </button>
            <input className={`${styles['input-text']} ${layout['mr-1']} ${layout['col-12']}`} type="text" name="comment" placeholder="Add a comment" onChange={(event) => {setComment(event.target.value)}} />
            <button className={`${styles['submit-button']}`} type="submit">Post</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
