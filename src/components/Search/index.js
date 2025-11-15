import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaSearch, FaRegComment} from 'react-icons/fa'
import {BsHeart, BsFillHeartFill} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'
import './index.css'

const apiStatus = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  EMPTY: 'EMPTY',
}

class Search extends Component {
  state = {
    searchInput: '',
    searchStatus: apiStatus.INITIAL,
    results: [],
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  fetchResults = async () => {
    const {searchInput} = this.state
    this.setState({searchStatus: apiStatus.LOADING})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      if (data.posts.length === 0) {
        this.setState({searchStatus: apiStatus.EMPTY})
      } else {
        this.setState({
          searchStatus: apiStatus.SUCCESS,
          results: data.posts,
        })
      }
    } else {
      this.setState({searchStatus: apiStatus.FAILURE})
    }
  }

  onClickSearch = () => {
    this.fetchResults()
  }

  toggleLike = async post => {
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/insta-share/posts/${post.post_id}/like`
    const body = {like_status: !post.liked}

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(body),
    }

    await fetch(url, options)

    this.setState(prev => ({
      results: prev.results.map(each =>
        each.post_id === post.post_id
          ? {
              ...each,
              liked: !each.liked,
              likes_count: each.liked
                ? each.likes_count - 1
                : each.likes_count + 1,
            }
          : each,
      ),
    }))
  }

  navigateUser = id => {
    const {history} = this.props
    history.push(`/users/${id}`)
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" height={50} width={50} />
    </div>
  )

  renderEmpty = () => (
    <div className="no-results-container">
      <img
        src="https://res.cloudinary.com/dkfinddnx/image/upload/v1571273172/no-search.png"
        alt="search not found"
      />
      <h1>Search Not Found</h1>
      <p>Try different keyword or search again</p>
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dkfinddnx/image/upload/v1571273172/failure.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.fetchResults}>
        Try again
      </button>
    </div>
  )

  renderSuccess = () => {
    const {results} = this.state

    return (
      <>
        <h1 className="results-heading">Search Results</h1>

        <ul className="search-results-list">
          {results.map(each => (
            <li key={each.post_id} className="search-post-item">
              <div className="author-box">
                <img
                  src={each.profile_pic}
                  alt="post author profile"
                  className="author-pic"
                />
                <p
                  className="username"
                  onClick={() => this.navigateUser(each.user_id)}
                >
                  {each.user_name}
                </p>
              </div>

              <img
                src={each.post_details.image_url}
                alt="post"
                className="post-image"
              />

              <div className="actions-row">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => this.toggleLike(each)}
                  testid={each.liked ? 'unLikeIcon' : 'likeIcon'}
                >
                  {each.liked ? (
                    <BsFillHeartFill className="liked-icon" />
                  ) : (
                    <BsHeart />
                  )}
                </button>

                <FaRegComment className="comment-icon" />
                <BiShareAlt className="share-icon" />
              </div>

              <p className="likes">{each.likes_count} likes</p>
              <p className="caption">{each.post_details.caption}</p>

              <ul className="comments-list">
                {each.comments.map(comment => (
                  <li key={comment.user_id + comment.comment}>
                    <span className="comment-username">
                      {comment.user_name}
                    </span>{' '}
                    <p className="comment-text">{comment.comment}</p>
                  </li>
                ))}
              </ul>

              <p className="time">{each.created_at}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderResults = () => {
    const {searchStatus} = this.state

    switch (searchStatus) {
      case apiStatus.LOADING:
        return this.renderLoader()
      case apiStatus.SUCCESS:
        return this.renderSuccess()
      case apiStatus.EMPTY:
        return this.renderEmpty()
      case apiStatus.FAILURE:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="search-bg">
        <div className="search-bar">
          <input
            type="search"
            placeholder="Search Caption"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
          <button
            type="button"
            onClick={this.onClickSearch}
            testid="searchIcon"
          >
            <FaSearch />
          </button>
        </div>

        {this.renderResults()}
      </div>
    )
  }
}

export default withRouter(Search)
