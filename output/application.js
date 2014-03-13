(function() {
  window.Chip = (function() {
    function Chip() {}

    return Chip;

  })();

}).call(this);

(function() {
  window.ChipBoard = (function() {
    function ChipBoard(x, y) {
      var _i, _j, _ref, _ref1;
      this.x = x;
      this.y = y;
      this.chips = [];
      $('#chips').append('<canvas></canvas>');
      for (x = _i = 0, _ref = this.x - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
        this.chips[x] = [];
        for (y = _j = 0, _ref1 = this.y - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
          this.chips[x][y] = null;
        }
      }
    }

    ChipBoard.prototype.addChip = function(x, y) {
      return this.chips[x][y] = new Chip();
    };

    return ChipBoard;

  })();

  module.exports = ChipBoard;

}).call(this);
