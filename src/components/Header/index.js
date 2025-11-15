import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-nav-container">
      <div className="header-desktop">
        <div className="header-logo-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
              className="header-website-logo"
            />
          </Link>
          <h1 className="header-logo-text">Insta Share</h1>
        </div>

        <ul className="header-links-list">
          <li>
            <Link to="/" className="header-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/my-profile" className="header-link">
              Profile
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={onLogout}
              className="header-logout-button"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
