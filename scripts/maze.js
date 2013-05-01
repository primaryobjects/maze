function mazeManager(context, maze) {
	this.context = context,
	this.width = maze.width,
	this.height = maze.height,
	this.start = maze.start,
	this.end = maze.end,
	this.maze = maze.map,

	this.draw = function(drawClear) {
		for (var y=0; y < this.height; y++) {
			for (var x=0; x < this.width; x++) {
				if (this.isWall(x, y)) {
					this.context.fillStyle = 'black';
					this.context.fillRect(x * 10, y * 10, 10, 10);
				}
				else if (drawClear) {
					this.context.fillStyle = 'white';
					this.context.fillRect(x * 10, y * 10, 10, 10);
				}
			}
		}
	},
	
	this.isWall = function(x, y) {
		return (x < 0 || y < 0 || this.maze[x + (y * this.width)] == '*');
	},
	
	this.isOpen = function(x, y) {
		return !this.isWall(x,y);
	}
};