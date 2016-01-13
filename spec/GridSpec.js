describe("Grid", function() {
  var grid;
  var gridSize = 5

  beforeEach(function() {
    grid = new Grid();
  });

  it("should create a grid of a default size 5x5", function() {
    var randomRow = Math.floor(Math.random()*gridSize);
    expect(grid.cells.length).toEqual(gridSize);
    expect(grid.cells[randomRow].length).toEqual(gridSize);
  });

  it("should create a new non empty grid with random numbers, given no state", function() {
    expect(grid).toBeNonEmpty(grid);
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

  it ("should set and return the correct cell number", function(){
    var randomRow = Math.floor(Math.random()*gridSize);
    var randomCol = Math.floor(Math.random()*gridSize);
    var val = 1;
    grid.setCell(randomRow, randomCol, val);
    expect(grid.cell(randomRow, randomCol)).toEqual(val);
  });

  it ("should not set cell to an invalid value", function(){
    var randomRow = Math.floor(Math.random()*gridSize);
    var randomCol = Math.floor(Math.random()*gridSize);
    var oldVal = grid.cell(randomRow, randomCol);
    var newVal = -1;
    grid.setCell(randomRow, randomCol, newVal);
    expect(grid.cell(randomRow, randomCol)).toEqual(oldVal);
  });

});
