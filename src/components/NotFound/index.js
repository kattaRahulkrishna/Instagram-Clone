import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://res.cloudinary.com/dkfinddnx/image/upload/v1571273172/not-found.png"
      alt="page not found"
      className="notfound-img"
    />
    <h1>PAGE NOT FOUND</h1>
    <p>we are sorry, the page you requested could not be found</p>

    <Link to="/">
      <button type="button" className="home-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
