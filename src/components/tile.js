export class Tile {
  constructor(rowIndex, colIndex, tileSize, isStart, isEnd, sketch) {
    this.rowIndex = rowIndex
    this.colIndex = colIndex
    this.pos = sketch.createVector(rowIndex, colIndex)
    this.pixelPos = sketch.createVector(rowIndex * tileSize, colIndex * tileSize)
    this.isStart = isStart
    this.isEnd = isEnd
    this.filled = false
    this.sketch = sketch
  }

  render(tileSize) {
    if (this.isStart) {
      this.sketch.fill(80, 220, 80)
    } else if (this.isEnd) {
      this.sketch.fill(220, 60, 50)
    } else if (this.filled) {
      this.sketch.fill(250, 250, 250)
    } else if ((this.pos.x + this.pos.y) % 2) {
      this.sketch.fill(70, 70, 80)
    } else {
      this.sketch.fill(80, 80, 90)
    }
    this.sketch.rect(this.pixelPos.x, this.pixelPos.y, tileSize, tileSize)
  }
}
