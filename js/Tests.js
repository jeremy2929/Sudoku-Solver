export function rowValuesTest(boxRow,tryValue,thisGrid) {
  // test all other boxes in row for value to be inserted
  for (var testColumn = 0; testColumn < 9; testColumn++) {
    // value to test of box is stored as first character of string [0]
    if (thisGrid.state.boxValue[boxRow][testColumn][0] === tryValue.toString()) {
      return false
    }
  }
  return true
}
export function columnValuesTest(boxColumn,tryValue,thisGrid) {
  // test all other boxes in column for value to be inserted
  for (var testRow = 0; testRow < 9; testRow++) {
    // value to test of box is stored as first character of string [0]
    if (thisGrid.state.boxValue[testRow][boxColumn][0] === tryValue.toString()) {
      return false
    }
  }
  return true
}
export function matrixValuesTest(tryValue,thisGrid,boxRow,boxColumn) {
  // test all boxes of local 3x3 matrix for value to be inserted
  for (var testMatrix = 0; testMatrix < 9; testMatrix++) {
    if (thisGrid.state.matrixArray[testMatrix] === tryValue.toString()) {
      return false
    }
  }
  return true
}
