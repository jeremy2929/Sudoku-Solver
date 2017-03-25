import React from "react"
import {Link} from "react-router"

export default React.createClass({
  render() {
    return(
      <header className="header_Bar">
        <div>
          <img
            className="header_GraphicsLeft"
            src="/styles/assets/header_pattern.png"></img>
        </div>
        <h1 className="main_Title">The Sudoku Puzzle Solver</h1>
      </header>
    )
  }
})
