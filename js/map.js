function generateLevel() {
  generateTiles();
}

function generateTiles() {
  tiles = [];

  for (let i = 0; i < numTilesX; i++) {
    tiles[i] = [];
    for (let j = 0; j < numTilesY; j++) {
      if (Math.random() < 0.3 || !inBounds(i, j)) {
        tiles[i][j] = new Wall(i, j);
      } else {
        tiles[i][j] = new Floor(i, j);
      }
    }
  }
}

function inBounds(x, y) {
  return x >= 0 && y >= 0 && x <= numTilesX - 1 && y <= numTilesY - 1;
}

function getTile(x, y) {
  if (inBounds(x, y)) {
    return tiles[x][y];
  } else {
    return new Wall(x, y);
  }
}

function randomPassableTile() {
  let tile;

  tryTo("get random passable tile", function() {
    let x = randomRange(0, numTilesX - 1);
    let y = randomRange(0, numTilesY - 1);
    tile = getTile(x, y);

    return tile.passable && !tile.monster;
  });
  return tile;
}
