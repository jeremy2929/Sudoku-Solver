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
    this.refs.examples.className = "hidden"
  },
  onLoadExample2Click() {
    // execute onLoadExample1Click function in Grid.js
    this.props.onLoadExample2Click()
    this.refs.examples.className = "hidden"
  },
  onLoadExample3Click() {
    // execute onLoadExample1Click function in Grid.js
    this.props.onLoadExample3Click()
    this.refs.examples.className = "hidden"
  },
  onExampleCLick(e) {
    this.refs.examples.className = "modal"
    this.refs.infoText.className = "hidden"
  },
  render() {
    return(
      <div className="user_box" >
        <p className="info_text" ref="infoText">This app allows you to enter a Sudoku puzzle and then click Solve button to have the app solve the puzzle.  It will display an error message if a bad puzzle has been entered.  To enter a puzzle, click on each box and type in the number.  The method used to solve is methodical brute force.</p>
        <div className="button_wrapper">
          <button className="solve_button" onClick={this.onSolveClick}>Solve</button>
          <button className="solve_button" onClick={this.onResetClick}>Reset</button>
          <button className="solve_button" onClick={this.onExampleCLick}>Examples</button>
        </div>

        {this.props.puzzleMessageDisplay && <PuzzleMessage
          counterValue={this.props.counterValue}
          puzzleMessage={this.props.puzzleMessage}/>}
          <div ref="examples" className="hidden">
            <div className="button_wrapper">
              <p className="">Click on one of the following example puzzeles to insert numbers and then click solve.</p>
              <button
                className="solve_button"
                onClick={this.onLoadExample1Click}>Easy</button>
              <button
                className="solve_button"
                onClick={this.onLoadExample2Click}>Medium</button>
              <button
                className="solve_button"
                onClick={this.onLoadExample3Click}>Hard</button>
            </div>
          </div>
      </div>

    )
  }
})
