describe("Game", function() {
  var game;
  var gridSize = 5;
  var state = "2121144222332322331131131";

  beforeEach(function() {
    game = new Game({state: state});
  });

  describe('construct a new game', function(){
    it ('should create a non-empty grid of random numbers', function(){
      expect(game.grid).toBeNonEmpty();
    });
  });

  describe('check adjacent cells', function(){
    it ('returns the correct adjacent value', function(){
      var randomRow = Math.floor(Math.random()*(gridSize-1)) + 1;
      var randomCol = Math.floor(Math.random()*(gridSize-1));
      var up = 0;
      var cellAbove = game.grid.cell(randomRow-1, randomCol);
      expect(game.adjacentCell(randomRow, randomCol, up).col).toEqual(randomCol);
      expect(game.adjacentCell(randomRow, randomCol, up).row).toEqual(randomRow-1);
      expect(game.adjacentCell(randomRow, randomCol, up).value).toEqual(cellAbove);
    });
  });

  describe ('merging cells', function(){
    it ('returns whether or not the cell is mergeable', function(){
      var mergeable = {row: 4, col: 4};
      var unmergeable = {row: 0, col: 1};
      expect(game.canMerge(mergeable.row, mergeable.col)).toBeTruthy();
      expect(game.canMerge(unmergeable.row, unmergeable.col)).toBeFalsy();
    });

    it ("increments correct cell when merged", function(){
      game.merge(0,2);
      expect(game.grid.cell(2,2)).toEqual(3);
    });

    it ('increments highest number in the game when current highest number is merged', function(){
      game.merge(1,1);
      expect(game.highestNumber).toEqual(5);
    });

    it ('does nothing when a cell cannot be merged', function(){
      game.merge(0,0);
      expect(game.grid.toString()).toEqual(state);
    });

    it ('returns the correct target to merge into', function(){
      var mergedCells = game.merge(2,1);
      expect(mergedCells.target.row).toEqual(3);
      expect(mergedCells.target.col).toEqual(1);
    });

    it ('returns the correct cells to be merged', function(){
      var mergedCells = game.merge(2,1);
      var expected = [  { row: 2, col: 1},
                        { row: 2, col: 0},
                        { row: 3, col: 1},
                        { row: 3, col: 2}   ];
      expect(mergedCells.merged).toContainCells(expected);
      expect(mergedCells.merged.length).toEqual(4);
    });

    it ('returns the correct cells to be dropped', function(){
      var mergedCells = game.merge(1,2);
      var expected = [  { row: 0, col: 3},
                        { row: 0, col: 4}   ];
      expect(mergedCells.dropped).toContainCells(expected);
      expect(mergedCells.dropped.length).toEqual(2);
    });

    it ('returns the correct cells to be replaced from above', function(){
      var mergedCells = game.merge(1,2);
      var expectedMerge = [ { row: 0, col: 2},
                            { row: 0, col: 3},
                            { row: 0, col: 4},
                            { row: 1, col: 2},
                            { row: 1, col: 4}   ];
      expect(mergedCells.replaced).toContainCells(expectedMerge);
      expect(mergedCells.replaced.length).toEqual(5);
    });
  });
});
