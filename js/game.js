const tileSize = 64;
const numTilesX = 9;
const numTilesY = 9;
const uiWidth = 4;

const maxHeight = numTilesY * tileSize;
let ctx = null;
let x = (y = 0);

const spritesheet = new Image();
const floorSpritesheet = new Image();
const wallSpritesheet = new Image();

spritesheet.src = "../assets/image/spritesheet/spritesheet.png";
floorSpritesheet.src = "../assets/image/spritesheet/floor.png";
wallSpritesheet.src = "../assets/image/spritesheet/wall.png";

document.addEventListener("keypress", function(e) {
  if (e.key == "w" && y > 0 && isAccessToMoveArea(x, y - 1)) {
    y--;
  }
  if (e.key == "s" && y < numTilesY - 1 && isAccessToMoveArea(x, y + 1)) y++;
  if (e.key == "a" && x > 0 && isAccessToMoveArea(x - 1, y)) x--;
  if (e.key == "d" && x < numTilesX - 1 && isAccessToMoveArea(x + 1, y)) x++;
});

function isAccessToMoveArea(x, y) {
  return getTile(x, y).passable;
}

function setupCanvas() {
  const canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");

  canvas.width = tileSize * (numTilesX + uiWidth);
  canvas.height = tileSize * numTilesY;
  canvas.style.width = canvas.width + "px";
  canvas.style.height = canvas.height + "px";
  ctx.imageSmoothingEnabled = false;
}

function drawSprite(spritesheet, spriteX, spriteY, x, y) {
  ctx.drawImage(
    spritesheet,
    spriteX * 16,
    spriteY * 16,
    16,
    16,
    x * tileSize,
    y * tileSize,
    tileSize,
    tileSize
  );
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numTilesX; i++) {
    for (let j = 0; j < numTilesY; j++) {
      getTile(i, j).draw();
    }
  }

  drawSprite(spritesheet, 0, 0, x, y);
}

document.addEventListener("DOMContentLoaded", function() {
  setupCanvas();

  generateLevel();

  const startingTile = randomPassableTile();
  x = startingTile.x;
  y = startingTile.y;

  setInterval(draw, 60);

  spritesheet.onload = () => {
    draw();
  };
});
