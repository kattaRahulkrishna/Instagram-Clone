import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {
    count: 0,
  }

  onDecrement = () => {
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  onIncrement = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  render() {
    const {count} = this.state
    return (
      <div className="counter-app-container">
        <h1 className="counter-heading">Counter</h1>
        <div className="counter-container">
          <button
            type="button"
            className="counter-button"
            onClick={this.onDecrement}
          >
            -
          </button>
          <div className="counter-value">{count}</div>
          <button
            type="button"
            className="counter-button"
            onClick={this.onIncrement}
          >
            +
          </button>
        </div>
      </div>
    )
  }
}

export default Counter
