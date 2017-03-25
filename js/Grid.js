import React from "react"
import Box from "./Box"
import {userValuesTest} from './UserTest'
import {backup} from './Backup'
import {rowValuesTest, columnValuesTest, matrixValuesTest} from './Tests'
import User from "./Buttons"

// these counters are for counting two loops, only for counting how many loops to solve puzzle
// counterC counts how many times the code moves forward a box
// counterV counts how many times a value is tried in a box
var counterBox = 0
var counterValue = 0
export default React.createClass({
  getInitialState() {
    // declaring a boolean in state to toggle error message for bad puzzle entered
    var puzzleMessageDisplay
    var puzzleMessage = "test"
    return {
      // this array will store values for each 3x3 matrix for testing
      matrixArray: [],
      // this array stores only the given values from the user before solving begins
      // this is needed to insure these values never change
      boxValueOriginal: [
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
      ],
      // this array will contain map of all values of the 81 squares
      boxValue: [
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
      ],
      // this array contains unique identifier for each of the 81 squares
      // this is used to mathematically determine which 3x3 matrix the box is in
      boxId: [["00","01","02","09","10","11","18","19","20"],
              ["03","04","05","12","13","14","21","22","23"],
              ["06","07","08","15","16","17","24","25","26"],
              ["27","28","29","36","37","38","45","46","47"],
              ["30","31","32","39","40","41","48","49","50"],
              ["33","34","35","42","43","44","51","52","53"],
              ["54","55","56","63","64","65","72","73","74"],
              ["57","58","59","66","67","68","75","76","77"],
              ["60","61","62","69","70","71","78","79","80"]]
    }
  },
  componentWillMount() {
    // fills boxValue array with one space so it will render
    for (var row = 0; row < 9; row++) {
       for (var column = 0; column < 9; column++) {
         this.state.boxValue[row][column] = " "
       }
     }
  },
  updateBoard(i, j, boxContent) {
    // determine mathematically in which local 3x3 square this square is located (0 thru 8)
    //   by using the unique box ID
    var matrixID = parseInt(Number(this.state.boxId[i][j]) / 9)
    // add value given by user to box as first character in string
    // and add value of local 3x3 square as second character in string
    this.state.boxValue[i][j] = boxContent.toString() + matrixID.toString()
    // copy same user values in this array to preserve them
    this.state.boxValueOriginal[i][j] = boxContent.toString() + matrixID.toString()
  },
  buildLocalMatrix(matrixID) {
    // defining an empty array to add values contained in local 3x3 square
    var tempArray = []
    // begin 2 loops, one for row, one for column, for all 81 squares
    for (var row = 0; row < 9; row++) {
      for (var column = 0; column < 9; column++) {
        // only build array using squares from local 3x3 square by checking second
        //    character (local 3x3 ID) of the string stored in boxValue array
        if (this.state.boxValue[row][column][1] === matrixID.toString()) {
          tempArray =  tempArray.concat((this.state.boxValue[row][column][0]))
        }
      }
    }
    // assign the array built to the local 3x3 array that is already in state
    this.state.matrixArray = tempArray
  },
  onSolveClick() {
    var thisGrid = this
    // set puzzleMessageDisplay to false to remove any Bad Puzzle message
    this.state.puzzleMessageDisplay = false
    // only try to solve if good data entered by user
    if(userValuesTest(thisGrid)) {
    // begin 2 loops, one for Row, one for Column for each square
      var valueStart = 1
      var boxRow = 0
      while(boxRow < 9) {
        var boxColumn = 0
        while(boxColumn < 9) {
          //
          counterBox++
          // begin loop of values 1 thru 9 to try each square
          for (var tryValue = valueStart; tryValue < 10; tryValue++) {
            counterValue++
            // setting flag to back up- will change to false a solution is found for box
            var backupFlag = true
            // validate only trying squares that are empty
            if(this.state.boxValueOriginal[boxRow][boxColumn] === undefined) {
              // determine mathematically in which local 3x3 square this square is located (0 thru 8)
              //   by using the unique box ID
              var matrixID = parseInt(Number(this.state.boxId[boxRow][boxColumn]) / 9)
              // calling function to build local 3x3 array to be tested
              this.buildLocalMatrix(matrixID)
              // if all 3 tests pass, insert the value defined by the tryValue loop as
              //      the first character of string at boxValue[][][0]
              // also storing local 3x3 square ID as second character in string
              //      at boxValue[][][1].  This ID is used to build local 3x3 array for
              //      testing.
              if (rowValuesTest(boxRow,tryValue,thisGrid) && columnValuesTest(boxColumn,tryValue,thisGrid) && matrixValuesTest(tryValue,thisGrid)) {
                // all tests pass so insert this value
                this.state.boxValue[boxRow][boxColumn] = tryValue.toString() + matrixID.toString()
                // no need to back up in puzzle to change previous values
                backupFlag = false
                // reset valueStart for next box
                valueStart = 1
                // end this loop of tryValue by assigning max value of loop
                tryValue = 9
                // move to next box
                boxColumn++
                // if column exceeds 8, move to next row and reset column
                if (boxColumn > 8) {
                  boxRow++
                  boxColumn = 0
                  // if Row exceeds 8, puzzle is solved. Set Column to max to end loop
                  if (boxRow > 8) {
                    boxColumn = 9
                    // once puzzle solved, display message by setting puzzleMessageDisplay to true
                    this.state.puzzleMessageDisplay = true
                    this.state.puzzleMessage = "PUZZLE SOLVED"
                    // convert the counter value to N,NNN,NNN format
                    counterValue = counterValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.setState({counterValue})
                  }
                }
              } else {
                // no solution found so need to enter backup code
                backupFlag = true
              }
              // if this box has value in boxValueOriginal array, then skip entire box
            } else {
              backupFlag = false
              valueStart = 1
              tryValue = 9
              boxColumn++
              if (boxColumn > 8) {
                boxRow++
                boxColumn = 0
                if (boxRow > 8) {
                  boxColumn = 9
                }
              }
            }
          }
          //  Begin of Backup Code
          var backupResult = backup(backupFlag,boxRow,boxColumn,thisGrid,valueStart)
          boxRow =  backupResult.boxRow
          boxColumn = backupResult.boxColumn
          valueStart = backupResult.valueStart
          // End of backup code
        }
      }
    } else {
      // bad data was entered by user so render an error message by setting puzzleMessageDisplay to true
      this.state.puzzleMessageDisplay = true
      this.state.puzzleMessage = "PUZZLE ENTERED HAS ERRORS"
    }
    this.setState(this.state.boxValue)
  },
  onResetClick() {
    window.location.reload()
  },
  render() {
return (
  <div className="body_area">
    <User counterValue={this.state.counterValue}
          onSolveClick={this.onSolveClick}
          onResetClick={this.onResetClick}
          puzzleMessage={this.state.puzzleMessage}
          puzzleMessageDisplay={this.state.puzzleMessageDisplay}/>
    <section className="grid_wrapper">
      <table >
        <tbody>
          {
            this.state.boxValue.map((rows, i)=> {
              return (
                <tr key={i}>
                  {
                    rows.map((cols, j)=>{
                      return (
                        <td key={j}><Box i={i} j={j} updateBoard={this.updateBoard} boxValue={this.state.boxValue}/></td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </section>
  </div>
  )}
})
