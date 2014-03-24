class window.ChipBoard
  constructor: (@x, @y) ->
    @chips = []
    @renderer = new Renderer(@x, @y)
    for x in [0..@x-1]
      @chips[x] = []
      for y in [0..@y-1]
        @addChips(x, y, 0)

  setInterval: ->
    setInterval(@update, 100)

  addChips: (x, y, height) ->
    @chips[x][y] = new ChipStack(this, height, [x,y])

  update: =>
    @iterate()
    @draw()

  iterate: ->
    for x in [0..@x-1]
      for y in [0..@y-1]
        @chips[x][y].fire()

  draw: ->
    for x in [0..@x-1]
      for y in [0..@y-1]
        @renderer.draw @chips[x][y]

  neighbors: (chip) ->
    coordinates = chip.coordinates
    neighbors = []
    for offset in [[0, -1], [1, 0], [0, 1], [-1, 0]]
      x = coordinates[0] + offset[0]
      y = coordinates[1] + offset[1]
      if x < @x && y < @y && x >= 0 && y >= 0
        chip = @chips[x][y]
        neighbors.push chip

    neighbors
