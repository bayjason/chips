describe 'ChipStack', ->
  describe 'constructor', ->
    it 'initializes this stack with a height', ->
      @stack = new ChipStack(null, 5)
      expect(@stack.height).toBe(5)
    it 'initializes this stack with a board', ->
      @stack = new ChipStack('board', 5)
      expect(@stack.board).toBe('board')
    it 'initializes this stack with coordinates', ->
      @coordinates = [1, 1]
      @stack = new ChipStack('board', 5, @coordinates)
      expect(@stack.coordinates).toBe(@coordinates)

  describe 'fire', ->
    beforeEach ->
      @board = new ChipBoard(10, 10)
      @stack = @board.addChips(5, 5, 5)

    it "distributes chips if its height >= 4", ->
      neighbors = [new ChipStack(), new ChipStack()]
      @stack.neighbors = ->
        neighbors

      spyOn(neighbors[0], 'grow')
      spyOn(neighbors[1], 'grow')
      @stack.fire()
      expect(neighbors[0].grow).toHaveBeenCalled()
      expect(neighbors[1].grow).toHaveBeenCalled()

      expect(@stack.height).toBe(3)


    it "does nothing if its height < 4", ->
      @stack.height = 3
      spyOn(@board, 'addChips')
      @stack.fire()
      expect(@board.addChips).not.toHaveBeenCalled()
      expect(@stack.height).toBe(3)

  describe 'grow', ->
    it "increases height by 1", ->
      @stack = new ChipStack(null, 5, [0,0])
      @stack.grow()
      expect(@stack.height).toBe(6)

