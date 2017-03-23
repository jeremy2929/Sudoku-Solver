import React from "react"
import Box from "./Box"
import {userValuesTest} from './userTest'

// these counters are for counting two loops, only for counting how many loops to solve puzzle
// counterC counts how many times the code moves forward a box
// counterV counts how many times a value is tried in a box
var counterBox = 0
var counterValue = 0
export default React.createClass({
  getInitialState() {
    return {
      // this array will store values for each 3x3 square for testing
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
  componentWillMount(){
    // fills boxValue array with one space so it will render
    for (var row = 0; row < 9; row++){
       for (var column = 0; column < 9; column++){
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
  buildLocalMatrix(matrixID){
    // defining an empty array to add values contained in local 3x3 square
    var tempArray = []
    // begin 2 loops, one for row, one for column, for all 81 squares
    for (var row = 0; row < 9; row++) {
      for (var column = 0; column < 9; column++) {
        // only build array using squares from local 3x3 square by checking second
        //    character (local 3x3 ID) of the string stored in boxValue array
        if (this.state.boxValue[row][column][1] === matrixID.toString()){
          tempArray =  tempArray.concat((this.state.boxValue[row][column][0]))
        }
      }
    }
    // assign the array built to the local 3x3 array that is already in state
    this.state.matrixArray = tempArray
  },
  rowValuesTest(boxRow,tryValue){
    // test all other squares in column for value to be inserted
    for (var testColumn = 0; testColumn < 9; testColumn++){
      // value of square is stored as first character of string [0]
      if (this.state.boxValue[boxRow][testColumn][0] === tryValue.toString()){
        return false
      }
    }
    return true
  },
  columnValuesTest(boxColumn,tryValue) {
    // test all other squares in row for value to be inserted
    for (var testRow = 0; testRow < 9; testRow++){
      // value of square is stored as first character of string [0]
      if (this.state.boxValue[testRow][boxColumn][0] === tryValue.toString()){
        return false
      }
    }
    return true
  },
  matrixValuesTest(tryValue,boxRow,boxColumn){
    // test all squares of local 3x3 square for value to be inserted
    for (var testMatrix = 0; testMatrix < 9; testMatrix++){
      if (this.state.matrixArray[testMatrix] === tryValue.toString()){
        return false
      }
    }
    return true
  },
  onSolveClick(){
    var thisGrid = this
    if(userValuesTest(thisGrid)){
  //  if(userValuesTest(thisGrid){
    // begin 2 loops, one for Row, one for Column for each square
    var valueStart = 1
    var boxRow = 0
    while(boxRow < 9){
      var boxColumn = 0
      while(boxColumn < 9){
        //
        counterBox++
        // begin loop of values 1 thru 9 to try each square
        for (var tryValue = valueStart; tryValue < 10; tryValue++){
          counterValue++
          // setting flag- will change to false if any tests fail
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
            if (this.rowValuesTest(boxRow,tryValue) && this.columnValuesTest(boxColumn,tryValue) && this.matrixValuesTest(tryValue)){
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
              if (boxColumn > 8){
                boxRow++
                boxColumn = 0
                // if Row exceeds 8, puzzle is solved. Set Column to max to end loop
                if (boxRow > 8){
                  boxColumn = 9
                  console.log("counterBox=",counterBox,"counterValue=",counterValue);
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
            if (boxColumn > 8){
              boxRow++
              boxColumn = 0
              if (boxRow > 8){
                boxColumn = 9
              }
            }
          }
        }
        //  Begin of Backup Code
        while(backupFlag){
          backupFlag = false
          boxColumn = boxColumn - 1
          if (boxColumn < 0){
            boxRow = boxRow - 1
            boxColumn = 8
            if (boxRow < 0){
              boxRow = 0
              boxColumn = 0
              backupFlag = false
            }
          }
          // if this box has value in boxValueOriginal array, then skip entire box
          if(this.state.boxValueOriginal[boxRow][boxColumn] != undefined) {
            backupFlag = true
          }
          if (backupFlag === false){
            valueStart = Number(this.state.boxValue[boxRow][boxColumn][0]) + 1
            if (backupFlag === false){this.state.boxValue[boxRow][boxColumn] = "0"}
          }
          // if valueStart exceeds 9, no solution for box so back up again by setting backupFlag = true
          if(valueStart > 9){
            backupFlag = true
          }
        }
        // End of backup code
      }
    }

  } else {
    window.location.reload()
  }


  this.setState(this.state.boxValue)
  },
  onResetClick(){
    window.location.reload()
  },
  render() {
return (
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
    <button className="solve_button" onClick={this.onSolveClick}>Solve</button>
    <button onClick={this.onResetClick}>
      Reset
    </button>
    </section>
  )}
})
