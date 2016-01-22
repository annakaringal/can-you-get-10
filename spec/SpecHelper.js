beforeEach(function () {

  function cellInArray (cell, arr){
    for (var i=0; i<arr.length; i++){
      if (cell.row === arr[i].row && cell.col === arr[i].col) return true;
    }
    return false;
  }

  jasmine.addMatchers({
    toBeNonEmpty: function () {
      return {
        compare: function (actual) {
          var grid = actual;
          var containsEmptyCell = false;
          grid.eachCell(function(row, col){
            if (!grid.cell(row, col)){
              containsEmptyCell = true;
            }
          });

          return {
            pass: !containsEmptyCell
          };
        }
      };
    },
    toContainCells: function () {
      return {
        compare: function (actual, expected) {
          var cellArray = actual;
          var cellDiff = false;

          if (cellArray.length != expected.length){
            cellDiff = true;
          } else {
            cellArray.forEach(function(cell){
              if (!cellInArray(cell, expected)) {
                cellDiff = false;
              } 
            });            
          }

          return {
            pass: !cellDiff
          };
        }
      };
    }
  });
});
