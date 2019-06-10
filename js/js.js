var ctx = null;
var GameMap = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 1, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 1, 3, 3, 1, 3, 0,
	0, 1, 3, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 0,
	0, 1, 3, 1, 3, 3, 1, 3, 1, 1, 3, 1, 3, 1, 1, 3, 3, 3, 1, 0,
	0, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 3, 1, 1, 1, 0,
	0, 1, 3, 3, 1, 3, 1, 3, 3, 1, 3, 1, 3, 1, 1, 1, 1, 3, 1, 0,
	0, 1, 3, 3, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 3, 3, 1, 1, 1, 0,
	0, 1, 3, 6, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 3, 1, 3, 0,
	0, 1, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 3, 1, 1, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 3, 8, 1, 1, 3, 1, 3, 1, 3, 1, 1, 0,
	0, 3, 1, 3, 1, 3, 3, 1, 3, 1, 3, 1, 3, 1, 1, 1, 3, 3, 1, 0,
	0, 1, 1, 3, 1, 1, 3, 1, 1, 1, 3, 1, 3, 3, 1, 3, 1, 3, 1, 0,
	0, 1, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1, 1, 3, 1, 3, 1, 3, 1, 0,
	0, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 3, 1, 3, 1, 0,
	0, 3, 1, 3, 1, 1, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 1, 3, 1, 0,
	0, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 3, 1, 1, 1, 3, 1, 7, 1, 0,
	0, 1, 3, 1, 1, 1, 3, 1, 3, 3, 1, 3, 3, 3, 1, 3, 1, 3, 1, 0,
	0, 1, 1, 1, 3, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
var tileWidth = 40, tileHeight = 40;
var mapWidth = 20, mapHeight = 20;
var currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;

var tileset = null, backImg = "assets/img.png", tilesetLoaded = false;;

var floorTypes = {
	solid: 0,
	path: 1,
	truePortal: 8,
	fakeBlock: 9,
	portal: 6
};
var tileTypes = {
	0: { color: "#685b48", floor: floorTypes.solid, sprite: [{ x: 0, y: 0, w: 40, h: 40 }] },
	1: { color: "#5aa457", floor: floorTypes.path, sprite: [{ x: 40, y: 0, w: 40, h: 40 }] },
	3: { color: "#286625", floor: floorTypes.solid, sprite: [{ x: 200, y: 0, w: 40, h: 40 }] },
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
	7: { color: "#685b48", floor: floorTypes.fakeBlock, sprite: [{ x: 280, y: 0, w: 40, h: 40 }] },
	6: { color: "#286625", floor: floorTypes.truePortal, sprite: [{ x: 240, y: 0, w: 40, h: 40 }] },
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