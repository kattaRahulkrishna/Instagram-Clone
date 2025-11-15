import Loader from 'react-loader-spinner'
import './index.css'

const LoadingView = () => (
  <div className="loader-container" testid="loader">
    <Loader type="TailSpin" height={50} width={50} />
  </div>
)

export default LoadingView
