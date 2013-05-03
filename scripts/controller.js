function mazeController() {
	this.canvas = null,
	this.context = null,
	this.maze = null,
	this.walker = null,
	this.algorithm = null,
	this.speed = null,
	
	this.init = function(maze) {
		this.canvas = $('#imageView').get(0);
		this.context = this.canvas.getContext('2d');
		
		// Auto-adjust canvas size to fit window.
		this.canvas.width  = maze.width * 10;
		this.canvas.height = maze.height * 10;
			
		// Initialize speed.
		this.speed = maze.speed == null ? 50 : maze.speed;
		
		// Create maze.
		this.maze = new mazeManager(this.context, maze);
		this.maze.draw();
		
		// Create walker at starting position.
		this.walker = new walkerManager(this.context, this.maze);
		this.walker.init();

		// Initialize the maze algorithm.
		this.algorithm = new searchAlgorithm(this.walker);
	},
	
	this.run = function() {
		if (!this.algorithm.isDone()) {
			this.algorithm.step();
			
			window.setTimeout(function() {
				controller.run();
			}, this.speed);
		}
		else {
			$('#btnGo').removeClass('disabled');
			$('#btnGo').text('Go!');
			
			// Clear map so we can draw the solution path.
			this.walker.maze.draw(true);
			
			// Draw the solution path.
			this.algorithm.solve();
		}
	}
};