import {
  Brain
} from './brain'

export class Player {
  constructor(startTile) {
    this.reachedGoal = false
    this.dead = false
    this.isBest = false
    this.generation = 1
    this.fitness = 0
    this.visitedTiles = []
    this.currentTile = startTile
    this.brain = new Brain()
  }

  update(tiles) {
    if (!this.reachedGoal && !this.dead) {
      this.move(tiles)
    }
  }

  move(tiles) {
    let availableMoves = []

    for (let i = -1; i <= 1; i++) {
      if (!tiles[this.currentTile.pos.x + i]) {
        continue
      }
      for (let j = -1; j <= 1; j++) {
        if (
          tiles[this.currentTile.pos.x + i][this.currentTile.pos.y + j] &&
          !this.visitedTiles.includes(tiles[this.currentTile.pos.x + i][this.currentTile.pos.y + j])
        ) {
          availableMoves.push(tiles[this.currentTile.pos.x + i][this.currentTile.pos.y + j])
        }
      }
    }

    if (availableMoves.length === 0) {
      this.dead = true
      return
    }

    if (availableMoves.length === 1) {
      tiles[availableMoves[0].pos.x][availableMoves[0].pos.y].filled = true
      this.currentTile = availableMoves[0]
      this.visitedTiles.push(this.currentTile)
      if (this.currentTile.isEnd) {
        this.reachedGoal = true
      }
      return
    }

    const nextTile =
      availableMoves[Math.floor(Math.random() * availableMoves.length)]
    nextTile.filled = true
    this.currentTile = nextTile
    this.visitedTiles.push(this.currentTile)
    if (this.currentTile.isEnd) {
      this.reachedGoal = true
    }
  }

  calculateFitness(endTile) {
    const distance = Math.sqrt(
      Math.pow(endTile.pos.x - this.currentTile.pos.x, 2) + Math.pow(endTile.pos.y - this.currentTile.pos.y, 2)
    )

    this.fitness = 1 / distance * 10
  }
}
