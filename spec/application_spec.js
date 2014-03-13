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
        return it("sets all cells to null", function() {
          var x, y, _i, _results;
          _results = [];
          for (x = _i = 0; _i < 99; x = ++_i) {
            _results.push((function() {
              var _j, _results1;
              _results1 = [];
              for (y = _j = 0; _j < 99; y = ++_j) {
                _results1.push(expect(this.board.chips[x][y]).toBe(null));
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
    return describe("game", function() {
      return it("can add a cell to the board", function() {
        this.board = new ChipBoard(5, 5);
        this.board.addChip(0, 0);
        return expect(this.board.chips[0][0] instanceof Chip).toBeTruthy();
      });
    });
  });

}).call(this);
