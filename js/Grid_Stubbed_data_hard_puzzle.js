import React from "react"
import {Link} from "react-router"
import Box from "./Box"
var debug = 0
var debug2 = 0
export default React.createClass({
  getInitialState() {
    return {
      // this array will store values for each 3x3 square for testing
      localArray: [],
      // this array stores only the given values from the user before solving begins
      // this is needed to insure these values never change
         boxValueOriginal: [[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,]],
  //    boxValueOriginal: [[,,,"61",,,"42",,],["70",,,,,"31","62",,],[,,,,"91","11",,"82",],[,,,,,,,,],[,"53",,"14","84",,,,"35"],[,,,"34",,"64",,"45","55"],[,"66",,"27",,,,"68",],["96",,"36",,,,,,],[,"26",,,,,"18",,]],
      // this array will contain map of all values of the 81 squares
          boxValue: [[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "]],
  //    boxValue: [[" "," "," ","61"," "," ","42"," "," "],["70"," "," "," "," ","31","62"," "," "],[" "," "," "," ","91","11"," ","82"," "],[" "," "," "," "," "," "," "," "," "],[" ","53"," ","14","84"," "," "," ","35"],[" "," "," ","34"," ","64"," ","45","55"],[" ","46"," ","27"," "," "," ","68"," "],["96"," ","36"," "," "," "," "," "," "],[" ","26"," "," "," "," ","18"," "," "]],
      // this array contains unique identifier for each of the 81 squares
      boxId: [["00","01","02","09","10","11","18","19","20"],
              ["03","04","05","12","13","14","21","22","23"],["06","07","08","15","16","17","24","25","26"],["27","28","29","36","37","38","45","46","47"],["30","31","32","39","40","41","48","49","50"],["33","34","35","42","43","44","51","52","53"],["54","55","56","63","64","65","72","73","74"],["57","58","59","66","67","68","75","76","77"],["60","61","62","69","70","71","78","79","80"]]
    }
  },
  updateBoard(i, j, boxContent) {
    // determine mathematically in which local 3x3 square this square is located (0 thru 8)
    //   by using the unique box ID
    var localIndex = parseInt(Number(this.state.boxId[i][j]) / 9)
    // add value given by user to box as first character in string
    // and add value of local 3x3 square as second character in string
    this.state.boxValue[i][j] = boxContent.toString() + localIndex.toString()
    // copy same user values in this array to preserve them
    this.state.boxValueOriginal[i][j] = boxContent.toString() + localIndex.toString()

  },
  buildLocalArray(localIndex){
    // defining an empty array to add values contained in local 3x3 square
    var tempArray = []
    // begin 2 loops, one for row, one for column, for all 81 squares
    for (var R = 0; R < 9; R++) {
      for (var C = 0; C < 9; C++) {
        // only build array using squares from local 3x3 square by checking second
        //    character (local 3x3 ID) of the string stored in boxValue array
        if (this.state.boxValue[R][C][1] === localIndex.toString()){
          tempArray =  tempArray.concat((this.state.boxValue[R][C][0]))
        }
      }
    }
    // assign the array built to the local 3x3 array that is already in state
    this.state.localArray = tempArray
  },
  testColumns(flag,solveR,solveV){
    // test all other squares in column for value to be inserted
    for (var testC = 0; testC < 9; testC++){
      // value of square is stored as first character of string [0]
      if (this.state.boxValue[solveR][testC][0] === solveV.toString()){
        flag = false
      }
    }
    return flag
  },
  testRows(flag,solveC,solveV) {
    // test all other squares in row for value to be inserted
    for (var testR = 0; testR < 9; testR++){
      // value of square is stored as first character of string [0]
      if (this.state.boxValue[testR][solveC][0] === solveV.toString()){
        flag = false
      }
    }
    return flag
  },
  test3x3(flag,solveV){
    // test all squares of local 3x3 square for value to be inserted
    for (var testL = 0; testL < 9; testL++){
      if (this.state.localArray[testL] === solveV.toString()){
        flag = false
      }
    }
    return flag
  },
  onSolveClick(){
    console.log(this.state.boxValue);
    console.log(this.state.boxValueOriginal);
    // begin 2 loops, one for Row, one for Column for each square
    var valueStart = 1
    var solveR = 0
    while(solveR < 9){
      var solveC = 0
      while(solveC < 9){
        debug++

        // begin loop of values 1 thru 9 to try each square
        for (var solveV = valueStart; solveV < 10; solveV++){
          debug2++
          // setting flag- will change to false if any tests fail
          var flag = true
          var backupFlag = true
          // validate only trying squares that are empty
          if(this.state.boxValueOriginal[solveR][solveC] === undefined) {

            //*******  Column Test  *******
            flag = this.testColumns(flag,solveR,solveV)

            //*******  Row Test  *******
            flag = this.testRows(flag,solveC,solveV)

            // determine which local 3x3 square this square is located (0 thru 8)
            var localIndex = parseInt(Number(this.state.boxId[solveR][solveC]) / 9)
            // calling function to build local 3x3 array to be tested
            this.buildLocalArray(localIndex)

            //*******  3x3 Test  *******
            flag = this.test3x3(flag,solveV)

            // if all 3 tests pass, insert the value defined by the solveV loop as
            //      the first character of string at boxValue[][][0]
            // also storing local 3x3 square ID as second character in string
            //      at boxValue[][][1].  This ID is used to build local 3x3 array for
            //      testing.
            if (flag === true){
              this.state.boxValue[solveR][solveC] = solveV.toString() + localIndex.toString()
              backupFlag = false
              valueStart = 1
              solveV = 9
              solveC++
              if (solveC > 8){
                solveR++
                solveC = 0
                if (solveR > 8){
                  solveC = 9
                  console.log("debug=",debug,"debug2=",debug2);
                  console.log("boxValue=",this.state.boxValue);
                  console.log("boxValueOriginal=",this.state.boxValueOriginal);
                }
              }
            } else {
              backupFlag = true
            }
          } else {
            backupFlag = false
            valueStart = 1
            solveV = 9
            solveC++
            if (solveC > 8){
              solveR++
              solveC = 0
              if (solveR > 8){
                solveC = 9
              }
            }
          }
        }

//&& Number(this.state.boxValue[0][3][0]) === 6 && Number(this.state.boxValue[0][0][0]) === 0 && Number(this.state.boxValue[0][5][0]) === 1 && Number(this.state.boxValue[0][6][0]) === 7 && Number(this.state.boxValue[0][7][0]) === 5 && Number(this.state.boxValue[0][8][0]) === 2
// if (debug > 500){
// for (var x = 0; x < 9; x++){
//   console.log(Number(this.state.boxValue[x][0][0]),Number(this.state.boxValue[x][1][0]),Number(this.state.boxValue[x][2][0]),Number(this.state.boxValue[x][3][0]),Number(this.state.boxValue[x][4][0]),Number(this.state.boxValue[x][5][0]),Number(this.state.boxValue[x][6][0]),Number(this.state.boxValue[x][7][0]),Number(this.state.boxValue[x][8][0]))
//
// }
// if(debug>1000){console.log(test);}
// }
if (debug / 500000 === parseInt(debug / 500000)){
  console.log("debug=",debug,"0,0=",Number(this.state.boxValue[0][0][0]))
  for (var x = 0; x < 9; x++){
    console.log(Number(this.state.boxValue[x][0][0]),Number(this.state.boxValue[x][1][0]),Number(this.state.boxValue[x][2][0]),Number(this.state.boxValue[x][3][0]),Number(this.state.boxValue[x][4][0]),Number(this.state.boxValue[x][5][0]),Number(this.state.boxValue[x][6][0]),Number(this.state.boxValue[x][7][0]),Number(this.state.boxValue[x][8][0]))




  }
  console.log("******************");
//   console.log(Number(this.state.boxValue[x][0]),Number(this.state.boxValue[x][1]),Number(this.state.boxValue[x][2]),Number(this.state.boxValue[x][3]),Number(this.state.boxValue[x][4]),Number(this.state.boxValue[x][5]),Number(this.state.boxValue[x][6]),Number(this.state.boxValue[x][7]),Number(this.state.boxValue[x][8]))

}
      //   if (Number(this.state.boxValue[0][0][0]) === 5 && Number(this.state.boxValue[0][1][0]) === 8 && Number(this.state.boxValue[0][2][0]) === 1 ){
      //   console.log("R and C now=",solveR,solveC,Number(this.state.boxValue[solveR][solveC][0]))
      //   console.log("******************");
      //
      //   for (var x = 0; x < 9; x++){
      //     console.log(Number(this.state.boxValue[x][0]),Number(this.state.boxValue[x][1]),Number(this.state.boxValue[x][2]),Number(this.state.boxValue[x][3]),Number(this.state.boxValue[x][4]),Number(this.state.boxValue[x][5]),Number(this.state.boxValue[x][6]),Number(this.state.boxValue[x][7]),Number(this.state.boxValue[x][8]))
      //   // console.log(Number(this.state.boxValue[x][0][0]),Number(this.state.boxValue[x][1][0]),Number(this.state.boxValue[x][2][0]),Number(this.state.boxValue[x][3][0]),Number(this.state.boxValue[x][4][0]),Number(this.state.boxValue[x][5][0]),Number(this.state.boxValue[x][6][0]),Number(this.state.boxValue[x][7][0]),Number(this.state.boxValue[x][8][0]))
      //
      // }
      // console.log("******************");
      //
      //   // console.log("box 4,0",Number(this.state.boxValue[4][0][0]));
      //   // console.log("box 4,1",Number(this.state.boxValue[4][1][0]));
      //   // console.log("box 4,2",Number(this.state.boxValue[4][2][0]));
      //   // console.log("box 4,3",Number(this.state.boxValue[4][3][0]));
      //   // console.log("box 4,4",Number(this.state.boxValue[4][4][0]));
      //   // console.log("box 4,5",Number(this.state.boxValue[4][5][0]));
      //   // console.log("box 4,6",Number(this.state.boxValue[4][6][0]));
      //   // console.log("box 4,7",Number(this.state.boxValue[4][7][0]));
      //   // console.log("box 4,8",Number(this.state.boxValue[4][8][0]));
      // }



        //  Begin of Backup Code
        while(backupFlag){
          backupFlag = false
          solveC = solveC - 1
          if (solveC < 0){
            solveR = solveR - 1
            solveC = 8
            if (solveR < 0){
              solveR = 0
              solveC = 0
              backupFlag = false
            }
          }
          if(this.state.boxValueOriginal[solveR][solveC] != undefined) {
            backupFlag = true
          }
          if (backupFlag === false){
            valueStart = Number(this.state.boxValue[solveR][solveC][0]) + 1
            if (backupFlag === false){this.state.boxValue[solveR][solveC] = "0"}
          }
          if(valueStart > 9){
            backupFlag = true
          }
        }
        // End of backup code
      }
    }
    this.setState(this.state.boxValue)
  },
  render() {
return (
    <section className="grid_wrapper">
      <table >
        <tbody>
          {
            this.state.boxValue.map((rows, i)=> {
              return (
                <tr className="boxArea" key={i}>
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
    </section>
  )}
})
