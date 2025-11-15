import {Component} from 'react'
import Cookies from 'js-cookie'
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

class MyProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.INITIAL,
    profileData: {},
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.IN_PROGRESS})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
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
        id: data.profile.id,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
        profilePic: data.profile.profile_pic,
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        postsCount: data.profile.posts_count,
        userBio: data.profile.user_bio,
        stories: data.profile.stories,
        posts: data.profile.posts,
      }

      this.setState({
        profileData: formattedData,
        apiStatus: apiStatusConstants.SUCCESS,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.FAILURE})
    }
  }

  onRetry = () => {
    this.getProfile()
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

  renderSuccessView = () => {
    const {profileData} = this.state
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
    } = profileData

    return (
      <div className="profile-container">
        <div className="profile-header">
          <img src={profilePic} alt="my profile" className="profile-pic" />

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
              <img src={story.image} alt="my story" className="story-img" />
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
                <img src={eachPost.image} alt="my post" className="post-img" />
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
        return this.renderSuccessView()
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
        <div className="my-profile-bg-container">{this.renderSwitch()}</div>
      </>
    )
  }
}

export default MyProfile
