(function() {
  describe('ChipBoard', function() {
    describe("constructor", function() {
      return describe("board", function() {
        beforeEach(function() {
          return this.board = new ChipBoard(5, 5);
        });
        it('has an x axis', function() {
          expect(this.board.chips instanceof Array).toBeTruthy();
          return expect(this.board.chips.length).toBe(5);
        });
        it('has a y axis', function() {
          var x, _i, _results;
          _results = [];
          for (x = _i = 0; _i < 4; x = ++_i) {
            expect(this.board.chips[x] instanceof Array).toBeTruthy();
            _results.push(expect(this.board.chips[x].length).toBe(5));
          }
          return _results;
        });
        it("sets all cells to an empty chipStack", function() {
          var x, y, _i, _results;
          _results = [];
          for (x = _i = 0; _i < 4; x = ++_i) {
            _results.push((function() {
              var _j, _results1;
              _results1 = [];
              for (y = _j = 0; _j < 4; y = ++_j) {
                expect(this.board.chips[x][y] instanceof ChipStack).toBeTruthy();
                expect(this.board.chips[x][y].height).toBe(0);
                _results1.push(expect(this.board.chips[x][y].coordinates).toEqual([x, y]));
              }
              return _results1;
            }).call(this));
          }
          return _results;
        });
        return it("initializes a renderer instance and tells it a height and width", function() {
          expect(this.board.renderer instanceof Renderer).toBe(true);
          expect(this.board.renderer.x).toBe(5);
          return expect(this.board.renderer.y).toBe(5);
        });
      });
    });
    describe("setInterval", function() {
      beforeEach(function() {
        jasmine.clock().install();
        this.board = new ChipBoard(100, 100);
        this.board.setInterval();
        this.draw = spyOn(this.board, 'draw');
        return this.iterate = spyOn(this.board, 'iterate');
      });
      afterEach(function() {
        return jasmine.clock().uninstall();
      });
      return it("puts draw() and iterate() on a 100ms timer", function() {
        jasmine.clock().tick(99);
        expect(this.draw).not.toHaveBeenCalled();
        expect(this.iterate).not.toHaveBeenCalled();
        jasmine.clock().tick(1);
        expect(this.draw).toHaveBeenCalled();
        expect(this.iterate).toHaveBeenCalled();
        jasmine.clock().tick(100);
        expect(this.draw.calls.count()).toEqual(2);
        return expect(this.iterate.calls.count()).toEqual(2);
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
    describe("draw", function() {
      beforeEach(function() {
        this.board = new ChipBoard(5, 5);
        this.draw = spyOn(this.board.renderer, 'draw');
        this.board.addChips(0, 0, 5);
        return this.board.addChips(0, 1, 5);
      });
      return it("iterates over each chip, telling the renderer to draw it", function() {
        this.board.draw();
        expect(this.draw).toHaveBeenCalledWith(this.board.chips[0][0]);
        return expect(this.draw).toHaveBeenCalledWith(this.board.chips[0][1]);
      });
    });
    return describe("neighbors", function() {
      beforeEach(function() {
        this.board = new ChipBoard(9, 9);
        return this.chip = this.board.addChips(4, 4, 5);
      });
      it("has 4 neighbors for a non-border cell", function() {
        return expect(this.board.neighbors(this.chip).length).toBe(4);
      });
      it("returns the list of a stack's neighbors", function() {
        var neighbors;
        neighbors = this.board.neighbors(this.chip);
        expect(neighbors[0].coordinates).toEqual([4, 3]);
        expect(neighbors[1].coordinates).toEqual([5, 4]);
        expect(neighbors[2].coordinates).toEqual([4, 5]);
        return expect(neighbors[3].coordinates).toEqual([3, 4]);
      });
      return it("does not include neighbors off the board", function() {
        var neighbors;
        this.chip = this.board.addChips(0, 0, 5);
        neighbors = this.board.neighbors(this.chip);
        expect(neighbors.length).toBe(2);
        expect(neighbors[0].coordinates).toEqual([1, 0]);
        return expect(neighbors[1].coordinates).toEqual([0, 1]);
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

(function() {
  describe("Renderer", function() {
    describe("constructor", function() {
      beforeEach(function() {
        affix('#chips');
        return this.renderer = new Renderer(100, 100);
      });
      it("creates a canvas for itself", function() {
        return expect($('#chips')).toContainElement('canvas');
      });
      it("sets the canvas' width and height", function() {
        var canvas;
        canvas = $('canvas');
        expect(canvas.attr('width')).toEqual('500');
        return expect(canvas.attr('height')).toEqual('500');
      });
      return it("grabs the 2d context from the canvas", function() {
        return expect(this.renderer.context).toEqual($('canvas')[0].getContext('2d'));
      });
    });
    describe("draw", function() {
      beforeEach(function() {
        this.renderer = new Renderer(100, 100);
        return spyOn(this.renderer.context, 'fillRect');
      });
      it("tells the context to draw a square at the chip's coordinates", function() {
        this.renderer.draw(new ChipStack(null, 5, [2, 3]));
        expect(this.renderer.context.fillRect).toHaveBeenCalledWith(10, 15, 5, 5);
        this.renderer.draw(new ChipStack(null, 5, [19, 1]));
        return expect(this.renderer.context.fillRect).toHaveBeenCalledWith(95, 5, 5, 5);
      });
      return it("tells the context to draw in a color based on the stack's height", function() {
        this.renderer.draw(new ChipStack(null, 5, [2, 3]));
        expect(this.renderer.fillStyle).toEqual('#4b4b4b');
        this.renderer.draw(new ChipStack(null, 1, [2, 3]));
        return expect(this.renderer.fillStyle).toEqual('#0f0f0f');
      });
    });
    return describe("cellColor", function() {
      beforeEach(function() {
        return this.renderer = new Renderer(100, 100);
      });
      it("is #5e5e5e for an empty cell", function() {
        return expect(this.renderer.cellColor(0)).toBe('#5e5e5e');
      });
      it("is white for a cell taller than 20 chips", function() {
        expect(this.renderer.cellColor(20)).toBe('#ffffff');
        expect(this.renderer.cellColor(21)).toBe('#ffffff');
        return expect(this.renderer.cellColor(2000)).toBe('#ffffff');
      });
      return it("is white with values between 155 and 255 in multiples of 5 for all other heights", function() {
        expect(this.renderer.cellColor(1)).toBe('#a0a0a0');
        expect(this.renderer.cellColor(2)).toBe('#a5a5a5');
        expect(this.renderer.cellColor(5)).toBe('#b4b4b4');
        return expect(this.renderer.cellColor(19)).toBe('#fafafa');
      });
    });
  });

}).call(this);
