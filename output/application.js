(function() {
  window.ChipBoard = (function() {
    function ChipBoard(x, y) {
      var _i, _j, _ref, _ref1;
      this.x = x;
      this.y = y;
      this.chips = [];
      this.renderer = new Renderer();
      $('#chips').append('<canvas></canvas>');
      for (x = _i = 0, _ref = this.x - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
        this.chips[x] = [];
        for (y = _j = 0, _ref1 = this.y - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
          this.addChips(x, y, 0);
        }
      }
    }

    ChipBoard.prototype.addChips = function(x, y, height) {
      return this.chips[x][y] = new ChipStack(this, height, [x, y]);
    };

    ChipBoard.prototype.iterate = function() {
      var x, y, _i, _ref, _results;
      _results = [];
      for (x = _i = 0, _ref = this.x - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (y = _j = 0, _ref1 = this.y - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
            _results1.push(this.chips[x][y].fire());
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    ChipBoard.prototype.draw = function() {
      var x, y, _i, _ref, _results;
      _results = [];
      for (x = _i = 0, _ref = this.x - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (y = _j = 0, _ref1 = this.y - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
            _results1.push(this.renderer.draw(this.chips[x][y]));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    ChipBoard.prototype.neighbors = function(chip) {
      var coordinates;
      coordinates = chip.coordinates;
      return [this.chips[coordinates[0]][coordinates[1] - 1], this.chips[coordinates[0] + 1][coordinates[1]], this.chips[coordinates[0]][coordinates[1] + 1], this.chips[coordinates[0] - 1][coordinates[1]]];
    };

    return ChipBoard;

  })();

}).call(this);

(function() {
  window.ChipStack = (function() {
    function ChipStack(board, height, coordinates) {
      this.board = board;
      this.height = height;
      this.coordinates = coordinates;
    }

    ChipStack.prototype.fire = function() {
      var neighbor, _i, _len, _ref, _results;
      if (this.height >= 4) {
        _ref = this.neighbors();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          neighbor = _ref[_i];
          neighbor.grow();
          _results.push(this.height -= 1);
        }
        return _results;
      }
    };

    ChipStack.prototype.neighbors = function() {
      return this.board.neighbors(this);
    };

    ChipStack.prototype.grow = function() {
      return this.height += 1;
    };

    return ChipStack;

  })();

}).call(this);

(function() {
  window.Renderer = (function() {
    function Renderer() {
      $('#chips').append('<canvas></canvas>');
    }

    Renderer.prototype.draw = function() {};

    return Renderer;

  })();

}).call(this);
