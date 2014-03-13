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

      it "sets all cells to null", ->
        for x in [0...99]
          for y in [0...99]
            expect(@board.chips[x][y]).toBe(null)

    describe "DOM", ->
      beforeEach ->
        affix('#chips')
        @board = new ChipBoard

      it "draws itself on a canvas element", ->
        expect($('#chips')).toContainElement('canvas')

  describe "game", ->
    it "can add a cell to the board", ->
      @board = new ChipBoard(5,5)
      @board.addChip(0, 0)
      expect(@board.chips[0][0] instanceof Chip).toBeTruthy()
