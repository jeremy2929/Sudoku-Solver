export function userValuesTest(thisGrid){
  // testing each column for more than one value entered
  var columnArray = []
  var boxColumn = 0
  while(boxColumn < 9){
    var boxRow = 0
    while(boxRow < 9){
      if (thisGrid.state.boxValueOriginal[boxRow][boxColumn] != undefined){
        columnArray = columnArray.concat(thisGrid.state.boxValueOriginal[boxRow][boxColumn][0])
      }
      boxRow++
    }
    var columnCount = {};
    columnArray.forEach(function(value){
      columnCount[value] = columnCount[value] + 1 || 1
    })
    for (var x = 1; x < 10; x++){
      if(columnCount[x.toString()] > 1){
        return false
      }
    }
    var columnArray = []
    boxColumn++
  }
// testing each row for more than one value entered
  var rowArray = []
  var boxRow = 0
  while(boxRow < 9){
    var boxColumn = 0
    while(boxColumn < 9){
      if (thisGrid.state.boxValueOriginal[boxRow][boxColumn] != undefined){
        rowArray = rowArray.concat(thisGrid.state.boxValueOriginal[boxRow][boxColumn][0])
      }
      boxColumn++
    }
    var rowCount = {};
    rowArray.forEach(function(value){
      rowCount[value] = rowCount[value] + 1 || 1
    })
    for (var x = 1; x < 10; x++){
      if(rowCount[x.toString()] > 1){
        return false
      }
    }
    var rowArray = []
    boxRow++
  }
  // testing each matrix for more than one value entered
  var matrixArray = []
  for (var eachMatrix = 0; eachMatrix < 9; eachMatrix++){
    var matrixCount = 0
    var boxRow = 0
    while(boxRow < 9){
      var boxColumn = 0
      while(boxColumn < 9){
        if (thisGrid.state.boxValueOriginal[boxRow][boxColumn] != undefined){
          if(thisGrid.state.boxValueOriginal[boxRow][boxColumn][1] === eachMatrix.toString()){
              matrixArray = matrixArray.concat(thisGrid.state.boxValueOriginal[boxRow][boxColumn][0])
          }
        }
        boxColumn++
      }
      boxRow++
    }
    var matrixCount = {};
    matrixArray.forEach(function(value){
      matrixCount[value] = matrixCount[value] + 1 || 1
    })
    for (var x = 1; x < 10; x++){
      if(matrixCount[x.toString()] > 1){
        return false
      }
    }
    var matrixArray = []
  }
  return true
}
