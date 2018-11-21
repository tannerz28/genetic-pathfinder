import {
  Tile
} from './tile'

import {
  Population
} from './population'

// GAME CONSTANTS
export const CANVAS_WIDTH = 600
export const CANVAS_HEIGHT = 600
export const ROW_COUNT = 40
export const COLUMN_COUNT = 40
export const TILE_SIZE = CANVAS_WIDTH / COLUMN_COUNT

export const state = {
  // GAME STATE
  currentTile: undefined,
  startTile: undefined,
  endTile: undefined,
  // let won = false
  keepPlaying: true,
  currentScore: 0,
  bestScore: 0,
  population: undefined
}

// AI CONSTANTS
const POPULATION_SIZE = 200
// const MUTATION_RATE = 0.01

/**
 * @type {Tile[][]}
 */
export const tiles = []

export function sketch(sketch) {
  sketch.setup = () => {
    sketch.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)

    const startX = Math.floor(Math.random() * ROW_COUNT)
    const startY = Math.floor(Math.random() * ROW_COUNT)

    let endX = Math.floor(Math.random() * ROW_COUNT)
    let endY = Math.floor(Math.random() * ROW_COUNT)

    while (
      (endX === startX && endY === startY) ||
      (Math.abs(endY - startY) < (ROW_COUNT / 2) && Math.abs(endX - startX) < (ROW_COUNT / 2))
    ) {
      endX = Math.floor(Math.random() * ROW_COUNT)
      endY = Math.floor(Math.random() * ROW_COUNT)
    }

    for (let i = 0; i < ROW_COUNT; i++) {
      tiles[i] = []
      for (let j = 0; j < COLUMN_COUNT; j++) {
        const isStart = startX === i && startY === j
        const isEnd = endX === i && endY === j
        tiles[i][j] = new Tile(i, j, TILE_SIZE, isStart, isEnd, sketch)

        if (isStart) {
          state.startTile = tiles[i][j]
          state.currentTile = state.startTile
        } else if (isEnd) {
          state.endTile = tiles[i][j]
        }
      }
    }

    state.population = new Population(POPULATION_SIZE, state.startTile)
  }

  sketch.draw = () => {
    sketch.background(188, 188, 188)
    drawTiles()

    if (state.population.stillTrying()) {
      state.population.update(tiles)
    } else {
      resetTiles()
      state.currentTile = state.startTile
    }
  }

  function drawTiles() {
    tiles.forEach(row => row.forEach(tile => tile.render(TILE_SIZE)))
  }

  function resetTiles() {
    tiles.forEach(r => r.forEach(t => (t.filled = false)))
  }
}
