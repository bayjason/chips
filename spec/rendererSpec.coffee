describe "Renderer", ->
  describe "constructor", ->
    beforeEach ->
      affix('#chips')
      @renderer = new Renderer

    it "creates a canvas for itself", ->
      expect($('#chips')).toContainElement('canvas')
