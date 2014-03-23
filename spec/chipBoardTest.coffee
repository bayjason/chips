describe 'ChipBoard', ->
  describe "constructor", ->
    describe "board", ->
      beforeEach ->
        @board = new ChipBoard(100, 100)

      it 'has an x axis', ->
        expect(@board.chips instanceof Array).toBeTruthy()
        expect(@board.chips.length).toBe(100)

      it 'has a y axis', ->
        for x in [0...99]
          expect(@board.chips[x] instanceof Array).toBeTruthy()
          expect(@board.chips[x].length).toBe(100)

      it "sets all cells to an empty chipStack", ->
        for x in [0...99]
          for y in [0...99]
            expect(@board.chips[x][y] instanceof ChipStack).toBeTruthy()
            expect(@board.chips[x][y].height).toBe(0)
            expect(@board.chips[x][y].coordinates).toEqual [x, y]

      it "initializes a renderer instance", ->
        expect(@board.renderer instanceof Renderer).toBe(true)

  describe "addChips", ->
    beforeEach ->
      @board = new ChipBoard(5,5)

    it "can add chips to the board", ->
      @board.addChips(0, 0, 5)
      expect(@board.chips[0][0] instanceof ChipStack).toBeTruthy()

    it "sets the height of the stack", ->
      @board.addChips(0, 0, 5)
      expect(@board.chips[0][0].height).toBe(5)

    it "sets the coordinates of the stack", ->
      @board.addChips(0, 0, 5)
      expect(@board.chips[0][0].coordinates[0]).toBe(0)
      expect(@board.chips[0][0].coordinates[1]).toBe(0)

  describe "iterate", ->
    beforeEach ->
      @board = new ChipBoard(5,5)

    it "tells each stack to fire", ->
      @board.addChips(0, 0, 5)
      @board.addChips(0, 1, 5)

      spyOn(@board.chips[0][0], 'fire')
      spyOn(@board.chips[0][1], 'fire')
      @board.iterate()
      expect(@board.chips[0][0].fire).toHaveBeenCalled()
      expect(@board.chips[0][1].fire).toHaveBeenCalled()

  describe "draw", ->
    beforeEach ->
      @board = new ChipBoard(5,5)
      @draw = spyOn(@board.renderer, 'draw')
      @board.addChips(0, 0, 5)
      @board.addChips(0, 1, 5)

    it "iterates over each chip, telling the renderer to draw it", ->
      @board.draw()
      expect(@draw).toHaveBeenCalledWith(@board.chips[0][0])
      expect(@draw).toHaveBeenCalledWith(@board.chips[0][1])

  describe "neighbors", ->
    beforeEach ->
      @board = new ChipBoard(9, 9)
      @chip = @board.addChips(4,4, 5)

    it "has 4 neighbors", ->
      expect(@board.neighbors(@chip).length).toBe(4)

    it "returns the list of a stack's neighbors", ->
      neighbors = @board.neighbors(@chip)
      expect(neighbors[0].coordinates).toEqual([4, 3])
      expect(neighbors[1].coordinates).toEqual([5, 4])
      expect(neighbors[2].coordinates).toEqual([4, 5])
      expect(neighbors[3].coordinates).toEqual([3, 4])
