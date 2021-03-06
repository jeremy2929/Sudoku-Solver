import React from "react"
import {Link} from "react-router"

export default React.createClass({
  Gadget89() {
    // Gadget89's Portfolio
    window.open("https://nicolas-roybal-portfolio.herokuapp.com", '_blank')
  },
  jeremy2929() {
    // jeremy2929's Portfolio
    window.open("https://portfolio-jw.herokuapp.com", '_blank')
  },
  render() {
    return(
      <footer className="footer_wrapper">
        <section>
          <ul>
            <li className="footer_text">A team project by
              <a className="our_name" href="#" onClick={this.Gadget89}> Nicolas Roybal
              </a>
              <p className="footer_text"> and </p>
              <a className="our_name" href="#" onClick={this.jeremy2929}>Jeremy Ward
              </a>
              <p className="copyright_text">Copyright Sudoku Puzzle Solver 2017</p>
            </li>
          </ul>
          <img className="header_graphics_right"src="/styles/assets/footer_pattern.png"></img>
        </section>
      </footer>
    )
  }
})
