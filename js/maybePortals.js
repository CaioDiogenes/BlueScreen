//Just some adjusts... nothing to much important
Bomberman.prototype.processMovement = function (t) {
	if (this.tileFrom[0] == this.tileTo[0] && this.tileFrom[1] == this.tileTo[1]) { return false; }

	if ((t - this.timeMoved) >= this.delayMove) {
		this.placeAt(this.tileTo[0], this.tileTo[1]);

		var tileFloor = tileTypes[GameMap[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor;

		if (tileFloor == floorTypes.secondPhase) {
			window.location.href = "secondPhase.html"
        }
        
        if (tileFloor == floorTypes.fakeBlock) {
            window.alert("Ohhh no it's a trap, try again bro!")
			window.location.href = "index.html"
        }   
        
        if (tileFloor == floorTypes.portal) {
            window.alert("Good Try. But ins't this!")
			window.location.href = "index.html"
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