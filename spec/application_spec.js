(function() {
  describe('ChipBoard', function() {
    describe("constructor", function() {
      describe("board", function() {
        beforeEach(function() {
          return this.board = new ChipBoard(100, 100);
        });
        it('has an x axis', function() {
          expect(this.board.chips instanceof Array).toBeTruthy();
          return expect(this.board.chips.length).toBe(100);
        });
        it('has a y axis', function() {
          var x, _i, _results;
          _results = [];
          for (x = _i = 0; _i < 99; x = ++_i) {
            expect(this.board.chips[x] instanceof Array).toBeTruthy();
            _results.push(expect(this.board.chips[x].length).toBe(100));
          }
          return _results;
        });
        return it("sets all cells to an empty chipStack", function() {
          var x, y, _i, _results;
          _results = [];
          for (x = _i = 0; _i < 99; x = ++_i) {
            _results.push((function() {
              var _j, _results1;
              _results1 = [];
              for (y = _j = 0; _j < 99; y = ++_j) {
                expect(this.board.chips[x][y] instanceof ChipStack).toBeTruthy();
                expect(this.board.chips[x][y].height).toBe(0);
                _results1.push(expect(this.board.chips[x][y].coordinates).toEqual([x, y]));
              }
              return _results1;
            }).call(this));
          }
          return _results;
        });
      });
      return describe("DOM", function() {
        beforeEach(function() {
          affix('#chips');
          return this.board = new ChipBoard;
        });
        return it("draws itself on a canvas element", function() {
          return expect($('#chips')).toContainElement('canvas');
        });
      });
    });
    describe("addChips", function() {
      beforeEach(function() {
        return this.board = new ChipBoard(5, 5);
      });
      it("can add chips to the board", function() {
        this.board.addChips(0, 0, 5);
        return expect(this.board.chips[0][0] instanceof ChipStack).toBeTruthy();
      });
      it("sets the height of the stack", function() {
        this.board.addChips(0, 0, 5);
        return expect(this.board.chips[0][0].height).toBe(5);
      });
      return it("sets the coordinates of the stack", function() {
        this.board.addChips(0, 0, 5);
        expect(this.board.chips[0][0].coordinates[0]).toBe(0);
        return expect(this.board.chips[0][0].coordinates[1]).toBe(0);
      });
    });
    describe("iterate", function() {
      beforeEach(function() {
        return this.board = new ChipBoard(5, 5);
      });
      return it("tells each stack to fire", function() {
        this.board.addChips(0, 0, 5);
        this.board.addChips(0, 1, 5);
        spyOn(this.board.chips[0][0], 'fire');
        spyOn(this.board.chips[0][1], 'fire');
        this.board.iterate();
        expect(this.board.chips[0][0].fire).toHaveBeenCalled();
        return expect(this.board.chips[0][1].fire).toHaveBeenCalled();
      });
    });
    return describe("neighbors", function() {
      beforeEach(function() {
        this.board = new ChipBoard(9, 9);
        return this.chip = this.board.addChips(4, 4, 5);
      });
      it("has 4 neighbors", function() {
        return expect(this.board.neighbors(this.chip).length).toBe(4);
      });
      return it("returns the list of a stack's neighbors", function() {
        var neighbors;
        neighbors = this.board.neighbors(this.chip);
        expect(neighbors[0].coordinates).toEqual([4, 3]);
        expect(neighbors[1].coordinates).toEqual([5, 4]);
        expect(neighbors[2].coordinates).toEqual([4, 5]);
        return expect(neighbors[3].coordinates).toEqual([3, 4]);
      });
    });
  });

}).call(this);

(function() {
  describe('ChipStack', function() {
    describe('constructor', function() {
      it('initializes this stack with a height', function() {
        this.stack = new ChipStack(null, 5);
        return expect(this.stack.height).toBe(5);
      });
      it('initializes this stack with a board', function() {
        this.stack = new ChipStack('board', 5);
        return expect(this.stack.board).toBe('board');
      });
      return it('initializes this stack with coordinates', function() {
        this.coordinates = [1, 1];
        this.stack = new ChipStack('board', 5, this.coordinates);
        return expect(this.stack.coordinates).toBe(this.coordinates);
      });
    });
    describe('fire', function() {
      beforeEach(function() {
        this.board = new ChipBoard(10, 10);
        return this.stack = this.board.addChips(5, 5, 5);
      });
      it("distributes chips if its height >= 4", function() {
        var neighbors;
        neighbors = [new ChipStack(), new ChipStack()];
        this.stack.neighbors = function() {
          return neighbors;
        };
        spyOn(neighbors[0], 'grow');
        spyOn(neighbors[1], 'grow');
        this.stack.fire();
        expect(neighbors[0].grow).toHaveBeenCalled();
        expect(neighbors[1].grow).toHaveBeenCalled();
        return expect(this.stack.height).toBe(3);
      });
      return it("does nothing if its height < 4", function() {
        this.stack.height = 3;
        spyOn(this.board, 'addChips');
        this.stack.fire();
        expect(this.board.addChips).not.toHaveBeenCalled();
        return expect(this.stack.height).toBe(3);
      });
    });
    return describe('grow', function() {
      return it("increases height by 1", function() {
        this.stack = new ChipStack(null, 5, [0, 0]);
        this.stack.grow();
        return expect(this.stack.height).toBe(6);
      });
    });
  });

}).call(this);
