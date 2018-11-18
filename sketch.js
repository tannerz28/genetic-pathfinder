const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 600
const ROW_COUNT = 20
const COLUMN_COUNT = 20
const TILE_SIZE = CANVAS_WIDTH / COLUMN_COUNT
let currentTile
let won = false
let keepPlaying = true
let startTile

/**
 * @type {Tile[][]}
 */
const tiles = []

function setup() {
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)

  const startX = Math.floor(Math.random() * ROW_COUNT)
  const startY = Math.floor(Math.random() * ROW_COUNT)

  let endX = Math.floor(Math.random() * ROW_COUNT)
  let endY = Math.floor(Math.random() * ROW_COUNT)

  while (
    (endX === startX && endY === startY) ||
    (Math.abs(endY - startY) < 5 && Math.abs(endX - startX) < 5)
  ) {
    endX = Math.floor(Math.random() * ROW_COUNT)
    endY = Math.floor(Math.random() * ROW_COUNT)
  }

  for (let i = 0; i < ROW_COUNT; i++) {
    tiles[i] = []
    for (let j = 0; j < COLUMN_COUNT; j++) {
      const isStart = startX === i && startY === j
      const isEnd = endX === i && endY === j
      tiles[i][j] = new Tile(i, j, TILE_SIZE, isStart, isEnd)

      if (isStart) {
        startTile = tiles[i][j]
        currentTile = startTile
      }
    }
  }
}

function draw() {
  background(188, 188, 188)
  drawTiles()
  if (keepPlaying) {
    move()
  } else {
    resetTiles()
    keepPlaying = true
    won = false
    currentTile = startTile
  }
}

function drawTiles() {
  tiles.forEach(row => row.forEach(tile => tile.render(TILE_SIZE)))
}

function move() {
  let availableMoves = []

  for (let i = -1; i <= 1; i++) {
    if (!tiles[currentTile.pos.x + i]) {
      continue
    }
    for (let j = -1; j <= 1; j++) {
      if (
        tiles[currentTile.pos.x + i][currentTile.pos.y + j] &&
        !tiles[currentTile.pos.x + i][currentTile.pos.y + j].filled
      ) {
        availableMoves.push(tiles[currentTile.pos.x + i][currentTile.pos.y + j])
      }
    }
  }

  if (availableMoves.length === 0) {
    keepPlaying = false
    return
  }

  if (availableMoves.length === 1) {
    tiles[availableMoves[0].pos.x][availableMoves[0].pos.y].filled = true
    currentTile = availableMoves[0]
    if (currentTile.isEnd) {
      won = true
      keepPlaying = false
    }
    return
  }

  const nextTile =
    availableMoves[Math.floor(Math.random() * availableMoves.length)]
  nextTile.filled = true
  currentTile = nextTile
  if (currentTile.isEnd) {
    won = true
    keepPlaying = false
  }
}

function resetTiles() {
  tiles.forEach(r => r.forEach(t => (t.filled = false)))
}