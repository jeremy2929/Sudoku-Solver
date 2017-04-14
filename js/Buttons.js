import React from "react"
import {Link} from "react-router"
import Grid from "./Grid"
import PuzzleMessage from "./PuzzleMessage"

export default React.createClass({
  onSolveClick() {
    // execute onSolveClick function in Grid.js
    this.props.onSolveClick()
  },
  onResetClick() {
    // execute onResetClick function in Grid.js
    this.props.onResetClick()
  },
  onLoadExample1Click() {
    // execute onLoadExample1Click function in Grid.js
    this.props.onLoadExample1Click()
  },
  onLoadExample2Click() {
    // execute onLoadExample1Click function in Grid.js
    this.props.onLoadExample2Click()
  },
  onLoadExample3Click() {
    // execute onLoadExample1Click function in Grid.js
    this.props.onLoadExample3Click()
  },
  render() {
    return(
      <div className="user_box" >
        <p className="info_text">This app allows you to enter a Sudoku puzzle and then click Solve button to have the app solve the puzzle.  It will display an error message if a bad puzzle has been entered.  To enter a puzzle, click on each box and type in the number.  The method used to solve is methodical brute force.</p>
        <button className="solve_button" onClick={this.onSolveClick}>Solve</button>
        <button className="reset_button" onClick={this.onResetClick}>Reset</button>
        <button className="load_example1_button" onClick={this.onLoadExample1Click}>Example 1</button>
        <button className="load_example2_button" onClick={this.onLoadExample2Click}>Example 2</button>
        <button className="load_example3_button" onClick={this.onLoadExample3Click}>Example 3</button>
        {this.props.puzzleMessageDisplay && <PuzzleMessage
          counterValue={this.props.counterValue}
          puzzleMessage={this.props.puzzleMessage}/>}
      </div>
    )
  }
})
