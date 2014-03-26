(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.ChipBoard = (function() {
    function ChipBoard(x, y) {
      var _i, _j, _ref, _ref1;
      this.x = x;
      this.y = y;
      this.update = __bind(this.update, this);
      this.chips = [];
      this.renderer = new Renderer(this.x, this.y, this);
      for (x = _i = 0, _ref = this.x - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
        this.chips[x] = [];
        for (y = _j = 0, _ref1 = this.y - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
          this.addChips(x, y, 0);
        }
      }
    }

    ChipBoard.prototype.setInterval = function() {
      return setInterval(this.update, 100);
    };

    ChipBoard.prototype.addChips = function(x, y, height) {
      if (this.chips[x][y] === void 0) {
        this.chips[x][y] = new ChipStack(this, height, [x, y]);
      } else {
        this.chips[x][y].height += height;
      }
      return this.chips[x][y];
    };

    ChipBoard.prototype.update = function() {
      this.iterate();
      return this.draw();
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
      var coordinates, neighbors, offset, x, y, _i, _len, _ref;
      coordinates = chip.coordinates;
      neighbors = [];
      _ref = [[0, -1], [1, 0], [0, 1], [-1, 0]];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        offset = _ref[_i];
        x = coordinates[0] + offset[0];
        y = coordinates[1] + offset[1];
        if (x < this.x && y < this.y && x >= 0 && y >= 0) {
          chip = this.chips[x][y];
          neighbors.push(chip);
        }
      }
      return neighbors;
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
    function Renderer(x, y, board) {
      this.x = x;
      this.y = y;
      this.board = board;
      this.canvas = $('<canvas/>').attr({
        width: this.x * 5,
        height: this.y * 5
      });
      $('#chips').append(this.canvas);
      this.context = this.canvas[0].getContext('2d');
      $('canvas').on('click', (function(_this) {
        return function(e) {
          var coords;
          coords = _this.coordinatesOf(e.pageX, e.pageY);
          return _this.board.addChips(coords[0], coords[1], 1);
        };
      })(this));
    }

    Renderer.prototype.draw = function(chips) {
      this.context.fillStyle = this.cellColor(chips.height);
      return this.context.fillRect(chips.coordinates[0] * 5, chips.coordinates[1] * 5, 5, 5);
    };

    Renderer.prototype.cellColor = function(height) {
      var color;
      if (height >= 20) {
        return '#ffffff';
      }
      if (height <= 0) {
        return '#5e5e5e';
      }
      color = (height * 5 + 155).toString(16);
      color = String('0' + color).slice(-2);
      return "#" + color + color + color;
    };

    Renderer.prototype.coordinatesOf = function(pageX, pageY) {
      return [Math.round((pageX - this.canvas[0].offsetLeft) / 5), Math.round((pageY - this.canvas[0].offsetTop) / 5)];
    };

    return Renderer;

  })();

}).call(this);
