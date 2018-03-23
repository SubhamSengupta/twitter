import React, {Component} from 'react'
import '../styles/footer.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="made-by">
          Made with
          <span className="love"> &hearts;</span>
          <span className="react"> React </span> 
          by <span className="name"> Subham</span>
        </div>
      </div>
    )
  }
}

export default Footer