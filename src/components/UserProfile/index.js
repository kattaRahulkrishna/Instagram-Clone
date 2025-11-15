import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.INITIAL,
    userProfile: {},
  }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.IN_PROGRESS})

    const {match} = this.props
    const {id} = match.params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const formattedData = {
        id: data.user_details.id,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
        profilePic: data.user_details.profile_pic,
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        postsCount: data.user_details.posts_count,
        userBio: data.user_details.user_bio,
        stories: data.user_details.stories,
        posts: data.user_details.posts,
      }

      this.setState({
        userProfile: formattedData,
        apiStatus: apiStatusConstants.SUCCESS,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.FAILURE})
    }
  }

  onRetry = () => {
    this.getUserProfile()
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dkfinddnx/image/upload/v1571273172/failure.png"
        alt="failure view"
        className="failure-img"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="retry-btn" onClick={this.onRetry}>
        Try again
      </button>
    </div>
  )

  renderSuccess = () => {
    const {userProfile} = this.state
    const {
      profilePic,
      userName,
      postsCount,
      followersCount,
      followingCount,
      userBio,
      userId,
      stories,
      posts,
    } = userProfile

    return (
      <div className="profile-container">
        <div className="profile-header">
          <img src={profilePic} alt="user profile" className="profile-pic" />

          <div className="details-section">
            <h1 className="username">{userName}</h1>

            <ul className="count-list">
              <li className="count-item">{postsCount} posts</li>
              <li className="count-item">{followersCount} followers</li>
              <li className="count-item">{followingCount} following</li>
            </ul>

            <p className="user-id">{userId}</p>
            <p className="user-bio">{userBio}</p>
          </div>
        </div>

        <ul className="stories-list">
          {stories.map(story => (
            <li key={story.id} className="story-item">
              <img src={story.image} alt="user story" className="story-img" />
            </li>
          ))}
        </ul>

        <div className="posts-heading-container">
          <BsGrid3X3 className="grid-icon" />
          <h1 className="posts-heading">Posts</h1>
        </div>

        {posts.length === 0 ? (
          <div className="no-posts-container">
            <BiCamera className="camera-icon" />
            <h1>No Posts</h1>
          </div>
        ) : (
          <ul className="posts-list">
            {posts.map(eachPost => (
              <li key={eachPost.id} className="post-item">
                <img
                  src={eachPost.image}
                  alt="user post"
                  className="post-img"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderSwitch = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return this.renderLoadingView()
      case apiStatusConstants.SUCCESS:
        return this.renderSuccess()
      case apiStatusConstants.FAILURE:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="user-profile-bg-container">{this.renderSwitch()}</div>
      </>
    )
  }
}

export default withRouter(UserProfile)
