class Tile {
  constructor(rowIndex, colIndex, tileSize, isStart, isEnd) {
    this.rowIndex = rowIndex
    this.colIndex = colIndex
    this.pos = createVector(rowIndex, colIndex)
    this.pixelPos = createVector(rowIndex * tileSize, colIndex * tileSize)
    this.isStart = isStart
    this.isEnd = isEnd
    this.filled = false
  }

  render(tileSize) {
    if (this.isStart) {
      fill(80, 220, 80)
    } else if (this.isEnd) {
      fill(220, 60, 50)
    } else if (this.filled) {
      fill(250, 250, 250)
    } else if ((this.pos.x + this.pos.y) % 2) {
      fill(70, 70, 80)
    } else {
      fill(80, 80, 90)
    }
    rect(this.pixelPos.x, this.pixelPos.y, tileSize, tileSize)
  }
}
