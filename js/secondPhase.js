var ctx = null;
var GameMap = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 1, 1, 1, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 3, 1, 1, 1, 1, 0,
	0, 1, 3, 1, 1, 1, 3, 3, 1, 3, 1, 1, 3, 1, 1, 1, 3, 3, 1, 0,
	0, 1, 1, 3, 3, 1, 3, 1, 1, 1, 1, 3, 8, 3, 1, 3, 1, 3, 1, 0,
	0, 3, 1, 3, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 4, 1, 1, 3, 1, 0,
	0, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 4, 1, 4, 1, 4, 1, 3, 1, 0,
	0, 1, 3, 3, 1, 1, 1, 3, 3, 4, 1, 1, 1, 4, 1, 1, 1, 3, 1, 0,
	0, 1, 3, 1, 1, 1, 3, 3, 1, 1, 1, 4, 1, 1, 4, 4, 1, 3, 1, 0,
	0, 1, 1, 1, 3, 1, 3, 1, 4, 1, 4, 1, 4, 1, 1, 4, 1, 3, 1, 0,
	0, 1, 3, 1, 1, 3, 4, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 3, 1, 0,
	0, 3, 1, 1, 3, 1, 1, 1, 4, 1, 4, 4, 4, 4, 1, 4, 1, 3, 1, 0,
	0, 1, 1, 3, 1, 4, 1, 1, 4, 1, 1, 8, 4, 1, 1, 4, 1, 3, 1, 0,
	0, 1, 3, 1, 1, 1, 1, 4, 4, 4, 4, 1, 4, 1, 4, 1, 1, 3, 1, 0,
	0, 1, 1, 1, 4, 4, 1, 1, 4, 1, 1, 1, 4, 1, 1, 4, 1, 1, 1, 0,
	0, 1, 3, 1, 1, 1, 4, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 3, 1, 0,
	0, 1, 1, 1, 4, 4, 1, 4, 4, 4, 1, 1, 1, 1, 4, 4, 1, 3, 1, 0,
	0, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 0,
	0, 1, 1, 1, 3, 1, 1, 1, 3, 1, 3, 1, 3, 1, 3, 3, 1, 1, 1, 0,
	0, 1, 3, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
var tileWidth = 40, tileHeight = 40;
var mapWidth = 20, mapHeight = 20;
var currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;

var tileset = null, backImg = "assets/img.png", tilesetLoaded = false;;

var floorTypes = {
	solid: 0,
	path: 1,
	ice: 3,
	portal: 8
};
var tileTypes = {
	0: { color: "#30b4e0", floor: floorTypes.solid, sprite: [{ x: 40, y: 40, w: 40, h: 40 }] },
	1: { color: "#30c0e8", floor: floorTypes.path, sprite: [{ x: 160, y: 0, w: 40, h: 40 }] },
	3: { color: "#286625", floor: floorTypes.ice, sprite: [{ x: 160, y: 40, w: 40, h: 40 }] },
	4: {
		color: "#678fd9", floor: floorTypes.solid, sprite: [
			{ x: 0, y: 80, w: 40, h: 40, d: 200 }, { x: 40, y: 80, w: 40, h: 40, d: 200 },
			{ x: 80, y: 80, w: 40, h: 40, d: 200 }, { x: 40, y: 80, w: 40, h: 40, d: 200 },
			{ x: 0, y: 80, w: 40, h: 40, d: 200 }, { x: 40, y: 80, w: 40, h: 40, d: 200 },
			{ x: 80, y: 80, w: 40, h: 40, d: 200 }, { x: 40, y: 80, w: 40, h: 40, d: 200 },
			{ x: 0, y: 80, w: 40, h: 40, d: 200 }, { x: 40, y: 80, w: 40, h: 40, d: 200 },
			{ x: 80, y: 80, w: 40, h: 40, d: 200 }, { x: 40, y: 80, w: 40, h: 40, d: 200 },
			{ x: 0, y: 80, w: 40, h: 40, d: 200 }, { x: 40, y: 80, w: 40, h: 40, d: 200 },
			{ x: 80, y: 80, w: 40, h: 40, d: 200 }, { x: 120, y: 80, w: 40, h: 40, d: 200 },
			{ x: 160, y: 80, w: 40, h: 40, d: 200 }, { x: 200, y: 80, w: 40, h: 40, d: 200 },
			{ x: 240, y: 80, w: 40, h: 40, d: 200 }, { x: 280, y: 80, w: 40, h: 40, d: 200 },
		]
	},
	8: { color: "#286625", floor: floorTypes.portal, sprite: [{ x: 0, y: 40, w: 40, h: 40 }] },
};

var directions = {
	up: 0,
	right: 1,
	down: 2,
	left: 3,
	bomb: 4
};

var keysDown = {
	37: false,
	38: false,
	39: false,
	40: false,
	32: false
};

var viewport = {
	screen: [0, 0],
	startTile: [0, 0],
	endTile: [0, 0],
	offset: [0, 0],
	update: function (px, py) {
		this.offset[0] = Math.floor((this.screen[0] / 2) - px);
		this.offset[1] = Math.floor((this.screen[1] / 2) - py);

		var tile = [Math.floor(px / tileWidth), Math.floor(py / tileHeight)];

		this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0] / 2) / tileWidth);
		this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1] / 2) / tileHeight);

		if (this.startTile[0] < 0) { this.startTile[0] = 0; }
		if (this.startTile[1] < 0) { this.startTile[1] = 0; }

		this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0] / 2) / tileWidth);
		this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1] / 2) / tileHeight);

		if (this.endTile[0] >= mapWidth) { this.endTile[0] = mapWidth - 1; }
		if (this.endTile[1] >= mapHeight) { this.endTile[1] = mapHeight - 1; }
	}
};

var player = new Bomberman();

function Bomberman() {
	this.tileFrom = [1, 1];
	this.tileTo = [1, 1];
	this.timeMoved = 0;
	this.dimensions = [30, 30];
	this.position = [45, 45];
	this.delayMove = 100;

	this.direction = directions.up;
	this.sprites = {};
	this.sprites[directions.up] = [{ x: 0, y: 240, w: 30, h: 30 }];
	this.sprites[directions.right] = [{ x: 0, y: 200, w: 30, h: 30 }];
	this.sprites[directions.down] = [{ x: 0, y: 120, w: 30, h: 30 }];
	this.sprites[directions.left] = [{ x: 0, y: 160, w: 30, h: 30 }];
}
Bomberman.prototype.placeAt = function (x, y) {
	this.tileFrom = [x, y];
	this.tileTo = [x, y];
	this.position = [((tileWidth * x) + ((tileWidth - this.dimensions[0]) / 2)),
	((tileHeight * y) + ((tileHeight - this.dimensions[1]) / 2))];
};
Bomberman.prototype.processMovement = function (t) {
	if (this.tileFrom[0] == this.tileTo[0] && this.tileFrom[1] == this.tileTo[1]) { return false; }

	if ((t - this.timeMoved) >= this.delayMove) {
		this.placeAt(this.tileTo[0], this.tileTo[1]);

		var tileFloor = tileTypes[GameMap[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor;

		if (tileFloor == floorTypes.portal) {
			window.location.href = "file:///D:/documents/Douglas/Teste/thirdPhase.html"
		}

		if (tileFloor == floorTypes.ice) {
			this.delayMove = 50;
		} else {
			this.delayMove = 100;
		}

	}
	else {
		this.position[0] = (this.tileFrom[0] * tileWidth) + ((tileWidth - this.dimensions[0]) / 2);
		this.position[1] = (this.tileFrom[1] * tileHeight) + ((tileHeight - this.dimensions[1]) / 2);

		if (this.tileTo[0] != this.tileFrom[0]) {
			var diff = (tileWidth / this.delayMove) * (t - this.timeMoved);
			this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff);
		}
		if (this.tileTo[1] != this.tileFrom[1]) {
			var diff = (tileHeight / this.delayMove) * (t - this.timeMoved);
			this.position[1] += (this.tileTo[1] < this.tileFrom[1] ? 0 - diff : diff);
		}

		this.position[0] = Math.round(this.position[0]);
		this.position[1] = Math.round(this.position[1]);
	}

	return true;
}
Bomberman.prototype.canMoveTo = function (x, y) {
	if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) { return false; }
	if (tileTypes[GameMap[toIndex(x, y)]].floor != floorTypes.path &&
		tileTypes[GameMap[toIndex(x,y)]].floor!=floorTypes.ice &&
		tileTypes[GameMap[toIndex(x, y)]].floor != floorTypes.portal) { return false; }
	return true;
};

Bomberman.prototype.DropBomb = function (x, y) {
	console.log(x, y, ' x e y')
	// if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) { return false; }
	// if (tileTypes[GameMap[toIndex(x, y)]].floor != floorTypes.path) { return false; }
	return true;
};


Bomberman.prototype.canMoveUp = function () { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] - 1); };
Bomberman.prototype.canMoveDown = function () { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] + 1); };
Bomberman.prototype.canMoveLeft = function () { return this.canMoveTo(this.tileFrom[0] - 1, this.tileFrom[1]); };
Bomberman.prototype.canMoveRight = function () { return this.canMoveTo(this.tileFrom[0] + 1, this.tileFrom[1]); };
Bomberman.prototype.canMoveDirection = function (d) {
	switch (d) {
		case directions.up:
			return this.canMoveUp();
		case directions.down:
			return this.canMoveDown();
		case directions.left:
			return this.canMoveLeft();
		default:
			return this.canMoveRight();
	}
};


Bomberman.prototype.moveLeft = function (t) { this.tileTo[0] -= 1; this.timeMoved = t; this.direction = directions.left; };
Bomberman.prototype.moveRight = function (t) { this.tileTo[0] += 1; this.timeMoved = t; this.direction = directions.right; };
Bomberman.prototype.moveUp = function (t) { this.tileTo[1] -= 1; this.timeMoved = t; this.direction = directions.up; };
Bomberman.prototype.moveDown = function (t) { this.tileTo[1] += 1; this.timeMoved = t; this.direction = directions.down; };
Bomberman.prototype.moveDirection = function (d, t) {
	switch (d) {
		case directions.up:
			return this.moveUp(t);
		case directions.down:
			return this.moveDown(t);
		case directions.left:
			return this.moveLeft(t);
		default:
			return this.moveRight(t);
	}
};

function toIndex(x, y) {
	return ((y * mapWidth) + x);
}

function getFrame(sprite, duration, time, animated) {
	if (!animated) { return sprite[0]; }
	time = time % duration;

	for (x in sprite) {
		if (sprite[x].end >= time) { return sprite[x]; }
	}
}

window.onload = function () {
	ctx = document.getElementById('game').getContext("2d");
	requestAnimationFrame(drawGame);
	// ctx.font = "bold 10pt sans-serif";

	window.addEventListener("keydown", function (e) {
		this.console.log(e.keyCode, ' <- code ', e.key, ' <- key.Name')
		if (e.keyCode >= 37 && e.keyCode <= 40) { keysDown[e.keyCode] = true; }
		if (e.keyCode == 32) { keysDown[e.keyCode] = true; }
	});
	window.addEventListener("keyup", function (e) {
		if (e.keyCode >= 37 && e.keyCode <= 40) { keysDown[e.keyCode] = false; }
	});

	viewport.screen = [document.getElementById('game').width,
	document.getElementById('game').height];

	tileset = new Image();
	tileset.onerror = function () {
		ctx = null;
		alert("Failed loading tileset.");
	};
	tileset.onload = function () { tilesetLoaded = true; };
	tileset.src = backImg;

	for (x in tileTypes) {
		tileTypes[x]['animated'] = tileTypes[x].sprite.length > 1 ? true : false;

		if (tileTypes[x].animated) {
			var t = 0;

			for (s in tileTypes[x].sprite) {
				tileTypes[x].sprite[s]['start'] = t;
				t += tileTypes[x].sprite[s].d;
				tileTypes[x].sprite[s]['end'] = t;
			}

			tileTypes[x]['spriteDuration'] = t;
		}
	}
};

function drawGame() {
	if (ctx == null) { return; }
	if (!tilesetLoaded) { requestAnimationFrame(drawGame); return; }

	var currentFrameTime = Date.now();
	var timeElapsed = currentFrameTime - lastFrameTime;

	var sec = Math.floor(Date.now() / 1000);
	if (sec != currentSecond) {
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	else { frameCount++; }

	if (!player.processMovement(currentFrameTime)) {
		if (keysDown[38] && player.canMoveUp()) { player.moveUp(currentFrameTime); }
		else if (keysDown[40] && player.canMoveDown()) { player.moveDown(currentFrameTime); }
		else if (keysDown[37] && player.canMoveLeft()) { player.moveLeft(currentFrameTime); }
		else if (keysDown[39] && player.canMoveRight()) { player.moveRight(currentFrameTime); }
		else if (keysDown[32] && player.canDropBomb()) { player.canDropBomb(currentFrameTime); }
	}

	viewport.update(player.position[0] + (player.dimensions[0] / 2),
		player.position[1] + (player.dimensions[1] / 2));

	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

	for (var y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y) {
		for (var x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x) {
			var tile = tileTypes[GameMap[toIndex(x, y)]];
			var sprite = getFrame(tile.sprite, tile.spriteDuration,
				currentFrameTime, tile.animated);
			ctx.drawImage(tileset,
				sprite.x, sprite.y, sprite.w, sprite.h,
				viewport.offset[0] + (x * tileWidth), viewport.offset[1] + (y * tileHeight),
				tileWidth, tileHeight);

		}
	}

	var sprite = player.sprites[player.direction];
	ctx.drawImage(tileset,
		sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
		viewport.offset[0] + player.position[0], viewport.offset[1] + player.position[1],
		player.dimensions[0], player.dimensions[1]);

	ctx.fillStyle = "#ff0000";
	ctx.fillText("FPS: " + framesLastSecond, 10, 20);

	lastFrameTime = currentFrameTime;
	requestAnimationFrame(drawGame);
}