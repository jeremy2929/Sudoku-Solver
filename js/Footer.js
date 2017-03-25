import React from "react"
import {Link} from "react-router"
//FIXME: Do we want a copyright here?
//FIXME: Need to insert links for anchors
export default React.createClass({
  render() {
    return(
      <footer className="footer_wrapper">
        <section>
          <ul>
            <li>
              Handcrafted in San Antonio, TX USA
            </li>
            <li>
              Copyright Sudoku Puzzle Solver 2017
            </li>
          </ul>
          <img className="header_GraphicsRight"src="/styles/assets/footer_pattern.png"></img>
        </section>
      </footer>
    )
  }
})
