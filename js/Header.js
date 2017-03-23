import React from "react"
import { Link } from "react-router"

export default React.createClass({
  render() {
    return(
      <header className="header_Bar">
        <div className="header_GraphicsLeft">
          <img src="/styles/grid1.png"></img>
        </div>
        <h1 className="main_Title">The Sudoku Puzzle Solver</h1>

          <div className="header_GraphicsRight">
            <img src="/styles/grid2.png"></img>
          </div>

      </header>
    )
  }
})
