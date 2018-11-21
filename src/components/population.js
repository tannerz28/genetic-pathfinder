import {
  Player
} from './player'

export class Population {
  constructor(size, startTile) {
    this.players = []
    this.fitnessSum = 0
    this.generation = 1

    for (let i = 0; i < size; i++) {
      this.players[i] = new Player(startTile)
    }
  }

  update(tiles) {
    this.players.forEach(p => {
      p.update(tiles)
    })
  }

  calculateFitness(endTile) {
    this.players.forEach(p => {
      p.calculateFitness(endTile)
    })
  }

  calculateFitnessSum() {
    this.fitnessSum = this.players.map(p => p.fitness).reduce((a, b) => a + b)
  }

  stillTrying() {
    return this.players.some(p => !p.dead && !p.reachedGoal)
  }
}
