describe "Renderer", ->
  describe "constructor", ->
    beforeEach ->
      affix('#chips')
      @renderer = new Renderer(100, 100)

    it "creates a canvas for itself", ->
      expect($('#chips')).toContainElement('canvas')

    it "sets the canvas' width and height", ->
      canvas = $('canvas')
      expect(canvas.attr('width')).toEqual('500')
      expect(canvas.attr('height')).toEqual('500')

    it "grabs the 2d context from the canvas", ->
      expect(@renderer.context).toEqual($('canvas')[0].getContext('2d'))

  describe "draw", ->
    beforeEach ->
      @renderer = new Renderer(100, 100)
      spyOn(@renderer.context, 'fillRect')

    it "tells the context to draw a square at the chip's coordinates", ->
      @renderer.draw(new ChipStack(null, 5, [2,3]))
      expect(@renderer.context.fillRect).toHaveBeenCalledWith(10, 15, 5, 5)
      @renderer.draw(new ChipStack(null, 5, [19,1]))
      expect(@renderer.context.fillRect).toHaveBeenCalledWith(95, 5, 5, 5)

    it "tells the context to draw in a color based on the stack's height", ->
      @renderer.draw(new ChipStack(null, 5, [2,3]))
      expect(@renderer.fillStyle).toEqual('#4b4b4b')
      @renderer.draw(new ChipStack(null, 1, [2,3]))
      expect(@renderer.fillStyle).toEqual('#0f0f0f')

  describe "cellColor", ->
    beforeEach ->
      @renderer = new Renderer(100, 100)

    it "is #5e5e5e for an empty cell", ->
      expect(@renderer.cellColor(0)).toBe('#5e5e5e')

    it "is white for a cell taller than 20 chips", ->
      expect(@renderer.cellColor(20)).toBe('#ffffff')
      expect(@renderer.cellColor(21)).toBe('#ffffff')
      expect(@renderer.cellColor(2000)).toBe('#ffffff')


    it "is white with values between 155 and 255 in multiples of 5 for all other heights", ->
      expect(@renderer.cellColor(1)).toBe('#a0a0a0')
      expect(@renderer.cellColor(2)).toBe('#a5a5a5')
      expect(@renderer.cellColor(5)).toBe('#b4b4b4')
      expect(@renderer.cellColor(19)).toBe('#fafafa')

