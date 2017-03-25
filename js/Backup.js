export function backup(backupFlag,boxRow,boxColumn,thisGrid,valueStart){
  while(backupFlag) {
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
    if(thisGrid.state.boxValueOriginal[boxRow][boxColumn] != undefined) {
      backupFlag = true
    }
    if (backupFlag === false) {
      valueStart = Number(thisGrid.state.boxValue[boxRow][boxColumn][0]) + 1
      if (backupFlag === false){thisGrid.state.boxValue[boxRow][boxColumn] = "0"}
    }
    // if valueStart exceeds 9, no solution for box so back up again by setting backupFlag = true
    if(valueStart > 9) {
      backupFlag = true
    }
  }
  // return all updated variables in an object
  return {
    valueStart: valueStart,
    boxRow: boxRow,
    boxColumn: boxColumn
  }
}
