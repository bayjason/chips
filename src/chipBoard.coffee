class window.ChipBoard
  constructor: (@x, @y) ->
    @chips = []
    $('#chips').append('<canvas></canvas>')
    for x in [0..@x-1]
      @chips[x] = []
      for y in [0..@y-1]
        @chips[x][y] = null

  addChip: (x, y) ->
    @chips[x][y] = new Chip()

module.exports = ChipBoard
