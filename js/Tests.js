export function rowValuesTest(boxRow,tryValue,thisGrid){
  // test all other squares in column for value to be inserted
  for (var testColumn = 0; testColumn < 9; testColumn++){
    // value of square is stored as first character of string [0]
    if (thisGrid.state.boxValue[boxRow][testColumn][0] === tryValue.toString()){
      return false
    }
  }
  return true
}
