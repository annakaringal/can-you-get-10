describe("Grid", function() {
  var grid;
  var randomRow, randomCol;
  var gridSize = 5;
  var state = "2121134222332322331131131";

  beforeEach(function() {
    grid = new Grid();
    randomRow = Math.floor(Math.random()*(gridSize-1));
    randomCol = Math.floor(Math.random()*(gridSize-1));
  });

  describe ('construct a new grid', function(){
    it("should create a grid of a default size 5x5", function() {
      expect(grid.cells.length).toEqual(gridSize);
      expect(grid.cells[randomRow].length).toEqual(gridSize);
    });

    it("should create a new non empty grid with random numbers, given no state", function() {
      expect(grid).toBeNonEmpty(grid);
    });

    it("should create a grid from a given state", function() {
      var gridFromState = new Grid({state: state});
      expect(gridFromState.cells).toEqual([ [2,1,2,1,1],
                                            [3,4,2,2,2],
                                            [3,3,2,3,2],
                                            [2,3,3,1,1],
                                            [3,1,1,3,1] ]);
    });

    it("should construct a new non empty grid with numbers between 1 and highestNumber", function() {
      var highestNumber = Math.floor(Math.random()*10 + 1);
      var newGrid = new Grid({highestNumber: highestNumber});

      var actualHighest = 0;
      var lessThanOne = false;
      newGrid.eachCell(function(row, col){
        var cell = newGrid.cell(row, col);
        if (cell > actualHighest){
          actualHighest = cell;
        }
        if (cell < 1){
          lessThanOne = true;
        }
      });

      expect(lessThanOne).toBeFalsy;
      expect(actualHighest).not.toBeGreaterThan(highestNumber);
    });
  });

  describe ('set cell value', function(){
    it ("should set and return the correct cell number", function(){
      var val = 1;
      grid.setCell(randomRow, randomCol, val);
      expect(grid.cell(randomRow, randomCol)).toEqual(val);
    });

    it ("should not set cell to an invalid value", function(){
      var oldVal = grid.cell(randomRow, randomCol);
      var newVal = -1;
      grid.setCell(randomRow, randomCol, newVal);
      expect(grid.cell(randomRow, randomCol)).toEqual(oldVal);
    });
  });

  describe ('retrieve grid state', function(){
    it("should return the grid's current state as a string", function() {
      var gridFromState = new Grid({state: state});
      expect(gridFromState.toString()).toEqual(state);
    });
  });

});
