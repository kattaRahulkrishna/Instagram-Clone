import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import Header from '../Header'
import UserStories from '../UserStories'
import PostItem from '../PostItem'
import FailureView from '../FailureView'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    searchInput: '',
    storiesStatus: apiStatus.initial,
    postsStatus: apiStatus.initial,
    searchStatus: apiStatus.initial,
    storiesList: [],
    postsList: [],
    searchResults: [],
  }

  componentDidMount() {
    this.fetchStories()
    this.fetchPosts()
  }

  fetchStories = async () => {
    this.setState({storiesStatus: apiStatus.loading})
    const token = Cookies.get('jwt_token')

    const response = await fetch('https://apis.ccbp.in/insta-share/stories', {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    })

    if (response.ok) {
      const data = await response.json()
      this.setState({
        storiesList: data.users_stories,
        storiesStatus: apiStatus.success,
      })
    } else {
      this.setState({storiesStatus: apiStatus.failure})
    }
  }

  fetchPosts = async () => {
    this.setState({postsStatus: apiStatus.loading})
    const token = Cookies.get('jwt_token')

    const response = await fetch('https://apis.ccbp.in/insta-share/posts', {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    })

    if (response.ok) {
      const data = await response.json()
      this.setState({
        postsList: data.posts,
        postsStatus: apiStatus.success,
      })
    } else {
      this.setState({postsStatus: apiStatus.failure})
    }
  }

  fetchSearchResults = async () => {
    this.setState({searchStatus: apiStatus.loading})
    const token = Cookies.get('jwt_token')
    const {searchInput} = this.state

    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`,
      {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      },
    )

    if (response.ok) {
      const data = await response.json()
      this.setState({
        searchResults: data.posts,
        searchStatus: apiStatus.success,
      })
    } else {
      this.setState({searchStatus: apiStatus.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    const {searchInput} = this.state
    if (searchInput !== '') {
      this.fetchSearchResults()
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" width={50} height={50} />
    </div>
  )

  renderNoSearchResults = () => (
    <div className="no-search">
      <img
        src="https://res.cloudinary.com/dkfinddnx/image/upload/v1571277907/search-not-found.png"
        alt="search not found"
      />
      <h1>Search Not Found</h1>
      <p>Try different keyword or search again</p>
    </div>
  )

  renderSearchResults = () => {
    const {searchStatus, searchResults} = this.state

    switch (searchStatus) {
      case apiStatus.loading:
        return this.renderLoader()

      case apiStatus.success:
        if (searchResults.length === 0) return this.renderNoSearchResults()
        return (
          <>
            <h1>Search Results</h1>
            <ul className="posts-list-container">
              {searchResults.map(each => (
                <PostItem key={each.post_id} post={each} />
              ))}
            </ul>
          </>
        )

      case apiStatus.failure:
        return <FailureView onRetry={this.fetchSearchResults} />

      default:
        return null
    }
  }

  renderStories = () => {
    const {storiesStatus, storiesList} = this.state

    switch (storiesStatus) {
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.success:
        return <UserStories stories={storiesList} />
      case apiStatus.failure:
        return <FailureView onRetry={this.fetchStories} />
      default:
        return null
    }
  }

  renderPosts = () => {
    const {postsStatus, postsList} = this.state

    switch (postsStatus) {
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.success:
        return (
          <ul className="posts-list-container">
            {postsList.map(each => (
              <PostItem key={each.post_id} post={each} />
            ))}
          </ul>
        )
      case apiStatus.failure:
        return <FailureView onRetry={this.fetchPosts} />
      default:
        return null
    }
  }

  render() {
    const {searchInput, searchStatus} = this.state
    const searchMode = searchStatus !== apiStatus.initial

    return (
      <>
        <Header />

        <div className="home-container">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search Caption"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              className="search-input"
            />
            <button
              type="button"
              className="search-btn"
              testid="searchIcon"
              onClick={this.onClickSearch}
            >
              <FaSearch />
            </button>
          </div>

          {searchMode ? (
            this.renderSearchResults()
          ) : (
            <>
              {this.renderStories()}
              {this.renderPosts()}
            </>
          )}
        </div>
      </>
    )
  }
}

export default Home
