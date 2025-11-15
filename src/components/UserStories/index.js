import Slider from 'react-slick'
import './index.css'

const UserStories = props => {
  const {stories} = props

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
  }

  return (
    <div className="stories-slider-container">
      <Slider {...settings}>
        {stories.map(each => (
          <div key={each.user_id} className="story-box">
            <img
              src={each.story_url}
              alt="user story"
              className="story-image"
            />
            <p className="story-name">{each.user_name}</p>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default UserStories
