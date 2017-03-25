import React from "react"
import {Link} from "react-router"
import Grid from "./Grid"
import PuzzleMessage from "./PuzzleMessage"

export default React.createClass({
  onSolveClick() {
    this.props.onSolveClick()
  },
  onResetClick() {
    this.props.onResetClick()
  },
  render() {
    return(
      <div className="user_box" >
        <p className="info_text">This app allows you to enter a Sudoku puzzle and then click Solve button to have the app solve the puzzle.  It will display an error message if you have entered a bad puzzle.  To enter a puzzle, click on each box and type in the number.  The method used to solve is methodical brute force.</p>
        <button className="solve_button" onClick={this.onSolveClick}>Solve</button>
        <button className="reset_button" onClick={this.onResetClick}>Reset</button>
        {this.props.puzzleMessageDisplay && <PuzzleMessage
          counterValue={this.props.counterValue}
          puzzleMessage={this.props.puzzleMessage}/>}
      </div>
    )
  }
})
