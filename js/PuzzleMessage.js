import React from "react"
import { Link } from "react-router"
import Grid from "./Grid"

export default React.createClass({
  render() {
    if(this.props.puzzleMessage === "PUZZLE SOLVED"){
      return(
        <div>
          <h1 className="puzzle_solved">{this.props.puzzleMessage}</h1>
          <h2 className="counter_display">Number of times a value was tested in each cell = {this.props.counterValue}</h2>
        </div>
      )
    } else {
      return(
        <h1 className="puzzle_error">{this.props.puzzleMessage}</h1>
      )
    }
  }
})
