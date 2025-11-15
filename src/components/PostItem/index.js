import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import Cookies from 'js-cookie'
import './index.css'

class PostItem extends Component {
  constructor(props) {
    super(props)
    const {post} = props
    this.state = {
      isLiked: false,
      likes: post.likes_count,
    }
  }

  onToggleLike = async () => {
    const {post} = this.props
    const {isLiked, likes} = this.state

    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${post.post_id}/like`

    const options = {
      method: 'POST',
      headers: {Authorization: `Bearer ${token}`},
      body: JSON.stringify({like_status: !isLiked}),
    }

    await fetch(url, options)

    this.setState({
      isLiked: !isLiked,
      likes: isLiked ? likes - 1 : likes + 1,
    })
  }

  render() {
    const {post} = this.props
    const {isLiked, likes} = this.state

    return (
      <li className="post-item-container">
        <div className="post-header">
          <Link to={`/users/${post.user_id}`}>
            <img
              src={post.profile_pic}
              alt="post author profile"
              className="post-author-profile-pic"
            />
          </Link>
          <Link to={`/users/${post.user_id}`} className="post-author-username">
            <p>{post.user_name}</p>
          </Link>
        </div>

        <img
          src={post.post_details.image_url}
          alt="post"
          className="post-image"
        />

        <div className="post-footer">
          <div className="post-icons-container">
            <button
              type="button"
              className="post-icon-button"
              onClick={this.onToggleLike}
              testid={isLiked ? 'unLikeIcon' : 'likeIcon'}
            >
              {isLiked ? (
                <FcLike className="post-icon liked" />
              ) : (
                <BsHeart className="post-icon" />
              )}
            </button>
            <button type="button" className="post-icon-button">
              <FaRegComment className="post-icon" />
            </button>
            <button type="button" className="post-icon-button">
              <BiShareAlt className="post-icon" />
            </button>
          </div>

          <p className="post-likes-count">{likes} likes</p>

          <p className="post-caption">{post.post_details.caption}</p>

          <ul className="post-comments-list">
            {post.comments.map(each => (
              <li key={each.user_id} className="post-comment-item">
                <span className="post-comment-username">{each.user_name}</span>
                {/* THIS IS THE FIX:
                  The comment text is now wrapped in a <p> tag as the test expects.
                */}
                <p>{each.comment}</p>
              </li>
            ))}
          </ul>
          <p className="post-created-at">{post.created_at}</p>
        </div>
      </li>
    )
  }
}

export default PostItem
