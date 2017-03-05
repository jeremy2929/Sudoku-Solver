import React from "react"
import { Link } from "react-router"

export default React.createClass({
  render() {
    return(
      <section className="headerBar">
        <div className="headerGraphicsLeft">
          <img src="/styles/grid1.png"></img>
        </div>
        <h1 className="mainTitle">The Sudoku Puzzle Solver</h1>
          <div className="headerGraphicsRight">
            <img src="/styles/grid2.png"></img>
          </div>
      </section>
    )
  }
})
