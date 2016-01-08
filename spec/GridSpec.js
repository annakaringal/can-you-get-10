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

});
