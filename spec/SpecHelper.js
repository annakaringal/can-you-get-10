beforeEach(function () {
  jasmine.addMatchers({
    toBeNonEmpty: function () {
      return {
        compare: function (actual) {
          var grid = actual;
          // var containsEmptyCell = false; 
          var containsEmptyCell;
          grid.eachCell(function(row, col){
            if (!grid.cell(row, col)){
              containsEmptyCell = true;
            }
          });

          return {
            pass: containsEmptyCell
          };
        }
      };
    }
  });
});
