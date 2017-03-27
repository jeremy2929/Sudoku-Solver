import React from "react"
import {Link} from "react-router"
var FontAwesome = require('react-fontawesome')

//FIXME: Do we want a copyright here?
//FIXME: Need to insert links for anchors
export default React.createClass({
  Gadget89() {
    window.open("https://github.com/Gadget89", '_blank')
  },
  jeremy2929() {
    window.open("https://github.com/jeremy2929", '_blank')
  },
  render() {
    return(
      <footer className="footer_wrapper">
        <section>
          <ul>
            <li className="icons">
              A team project by...
              <a href="#" onClick={this.Gadget89}>
                <i className="fa fa-github" aria-hidden="true">Gadget89</i>
              </a>
              <p className="icons"> & </p>
              <a href="#" onClick={this.jeremy2929}>
                <i className="fa fa-github" aria-hidden="true"></i>jeremy2929
              </a>
              <p className="copyright">Copyright Sudoku Puzzle Solver 2017</p>
            </li>
          </ul>
          <img className="header_GraphicsRight"src="/styles/assets/footer_pattern.png"></img>
        </section>
      </footer>
    )
  }
})
