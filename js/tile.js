class Tile {
  constructor(x, y, spritesheet, spriteX, spriteY, passable) {
    this.x = x;
    this.y = y;
    this.spriteX = spriteX;
    this.spriteY = spriteY;
    this.passable = passable;
    this.spritesheet = spritesheet;
  }

  draw() {
    drawSprite(this.spritesheet, this.spriteX, this.spriteY, this.x, this.y);
  }
}

class Floor extends Tile {
  constructor(x, y) {
    super(x, y, floorSpritesheet, 0, 2, true);
  }
}

class Wall extends Tile {
  constructor(x, y) {
    super(x, y, wallSpritesheet, 0, 2, false);
  }
}
