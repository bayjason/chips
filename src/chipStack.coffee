class window.ChipStack
  constructor: (@board, @height, @coordinates) ->

  fire: ->
    if @height >= 4
      for neighbor in this.neighbors()
        neighbor.grow()
        @height -= 1

  neighbors: ->
    @board.neighbors(this)

  grow: ->
    @height += 1
