import React from "react"
import {Link} from "react-router"

export default React.createClass({
  sudokuCode() {
    // link to source code on GitHub
    window.open("https://github.com/jeremy2929/Sudoku-Solver", '_blank')
  },
  render() {
    return(
      <header className="header_bar">
        <div>
          <img
            className="header_graphics_left"
            src="/styles/assets/header_pattern.png"></img>
        </div>
        <h1 className="main_title">The Sudoku Puzzle Solver</h1>
        <div className="sudoku_link">
          <a className="nav_button" href="#" onClick={this.sudokuCode}>
            <i className="fa fa-github fa-2x" aria-hidden="true"></i>
            <p className="sudoku_label">Sudoku Source Code</p>
          </a>
        </div>
      </header>
    )
  }
})
