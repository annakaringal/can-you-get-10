describe("Game", function() {
  var game;
  var gridSize = 5;

  beforeEach(function() {
    game = new Game();
  });

  it ('should create a non-empty grid of random numbers', function(){
    expect(game.grid).toBeNonEmpty(game.grid);
  });

  it ('returns the correct adjacent value', function(){
    var randomRow = Math.floor(Math.random()*gridSize);
    var randomCol = Math.floor(Math.random()*gridSize);
    var up = 0;
    var cellAbove = game.grid.cell(randomRow-1, randomCol);
    expect(game.adjacentCell(randomRow, randomCol, up).x).toEqual(randomRow-1);
    expect(game.adjacentCell(randomRow, randomCol, up).y).toEqual(randomCol);
    expect(game.adjacentCell(randomRow, randomCol, up).content).toEqual(cellAbove);
  });

});
