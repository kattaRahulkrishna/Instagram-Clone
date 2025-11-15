import './index.css'

const FailureView = ({onRetry}) => (
  <div className="failure-view-container">
    <img
      src="https://res.cloudinary.com/dkfinddnx/image/upload/v1571273172/failure.png"
      alt="failure view"
      className="failure-img"
    />
    <p>Something went wrong. Please try again</p>
    <button type="button" className="retry-btn" onClick={onRetry}>
      Try again
    </button>
  </div>
)

export default FailureView
