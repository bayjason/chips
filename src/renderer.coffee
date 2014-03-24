class window.Renderer
  constructor: (@x, @y) ->
    canvas = $('<canvas/>').attr(width: @x * 5, height: @y * 5)
    $('#chips').append(canvas)
    @context = canvas[0].getContext('2d')

  draw: (chips) ->
    @context.fillStyle = @cellColor(chips.height)
    @context.fillRect(chips.coordinates[0] * 5, chips.coordinates[1] * 5, 5, 5)

  cellColor: (height) ->
    return '#ffffff' if height >= 20
    return '#5e5e5e' if height <=  0
    color = (height * 5 + 155).toString(16)
    color = String('0' + color).slice(-2)
    "##{color}#{color}#{color}"
