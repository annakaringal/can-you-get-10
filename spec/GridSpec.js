describe("Grid", function() {
  var grid;

  beforeEach(function() {
    grid = new Grid();
  });

  it("should create a grid of a default size 5x5", function() {
    var randomRow = Math.floor(Math.random()*5);
    expect(grid.cells.length).toEqual(5);
    expect(grid.cells[randomRow].length).toEqual(5);
  });

  it("should create a new non empty grid with random numbers, given no state", function() {
    expect(grid).toBeNonEmpty(grid);
  });

  it("should construct a new non empty grid with numbers between 1 and highestNumber", function() {
    var highestNumber = Math.floor(Math.random()*10);
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
    expect(actualHighest).toEqual(highestNumber);
  });

});
