function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function walkerManager(context, maze, x, y) {
	this.context = context,
	this.maze = maze,
	this.x = x,
	this.y = y,
	this.lastX = -1,
	this.lastY = -1,
	this.visited = createArray(this.maze.width, this.maze.height),
	this.red = 255,

	this.init = function() {
		for (var x = 0; x < this.maze.width; x++) {
			for (var y = 0; y < this.maze.height; y++) {
				this.visited[x][y] = 0;
			}
		}
		
		this.visited[this.x][this.y] = 1;
		this.draw();
	},
	
	this.draw = function() {
		this.context.fillStyle = 'rgb(0, 155, 0)';
		this.context.fillRect(this.x * 10, this.y * 10, 10, 10);
		
		this.red = 255;
	},
	
	this.move = function(direction, backtrack) {
		var result = false;
		oldX = this.x;
		oldY = this.y;
		
		if (backtrack || (!backtrack && !this.hasVisited(direction))) {
			switch (direction) {
				case 0: if (this.canMove(this.x, this.y - 1)) { this.y--; result = true; } break;
				case 1: if (this.canMove(this.x + 1, this.y)) { this.x++; result = true; } break;
				case 2: if (this.canMove(this.x, this.y + 1)) { this.y++; result = true; } break;
				case 3: if (this.canMove(this.x - 1, this.y)) { this.x--; result = true; } break;
			};
		}
		
		/*if (backtrack && this.visited[oldX][oldY] == 2 && this.x == this.lastX && this.y == this.lastY) {
			// Found a trap. Do not walk back to this tile.
			this.x = oldX;
			this.y = oldY;
			result = false;
		}*/
		
		if (result) {
			this.context.fillStyle = 'rgb(' + this.red + ', 0, 0)';
			this.context.fillRect(oldX * 10, oldY * 10, 10, 10);
		
			this.lastX = oldX;
			this.lastY = oldY;
		
			this.visited[this.x][this.y]++;

			if (backtrack) {
				// We've turned around, so don't visit this tile again.
				this.visited[this.lastX][this.lastY] = 2;
			}
			
			if (this.visited[oldX][oldY] == 2 && this.visited[this.x][this.y] == 1) {
				// Found an unwalked tile while backtracking. Mark our last tile back to 1 so we can visit it again to exit this path.
				this.visited[oldX][oldY] = 1;
				this.context.fillStyle = 'rgb(255, 0, 0)';
				this.context.fillRect(oldX * 10, oldY * 10, 10, 10);
			}
		}
		
		return result;
	},
	
	this.canMove = function(x, y) {
		return (maze.isOpen(x, y) && this.visited[x][y] < 2);
	},
	
	this.hasVisited = function(direction) {
		var result = false;
		
		switch (direction) {
			case 0: if (this.visited[this.x][this.y - 1] == '1') { result = true; } break;
			case 1: if (this.visited[this.x + 1][this.y] == '1') { result = true; } break;
			case 2: if (this.visited[this.x][this.y + 1] == '1') { result = true; } break;
			case 3: if (this.visited[this.x - 1][this.y] == '1') { result = true; } break;
		};
		
		return result;
	}
};