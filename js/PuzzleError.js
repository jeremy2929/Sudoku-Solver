import React from "react"
import { Link } from "react-router"
import Grid from "./Grid"

export default React.createClass({
  render() {
    return(
      <h1 className="puzzle_error" ref="puzzleError">Bad Puzzle Entered</h1>
    )
  }
})
