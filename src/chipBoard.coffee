class window.ChipBoard
  constructor: (@x, @y) ->
    @chips = []
    $('#chips').append('<canvas></canvas>')
    for x in [0..@x-1]
      @chips[x] = []
      for y in [0..@y-1]
        @addChips(x, y, 0)

  addChips: (x, y, height) ->
    @chips[x][y] = new ChipStack(this, height, [x,y])

  iterate: ->
    for x in [0..@x-1]
      for y in [0..@y-1]
        @chips[x][y].fire()

  neighbors: (chip) ->
    coordinates = chip.coordinates
    [
      @chips[coordinates[0]][coordinates[1] - 1],
      @chips[coordinates[0] + 1][coordinates[1]],
      @chips[coordinates[0]][coordinates[1] + 1],
      @chips[coordinates[0] - 1][coordinates[1]]
    ]

