var canvas = null;
var context = null;
var maze = null;
var walker = null;
var algorithm = null;

$(function() {
	if (window.addEventListener) {
		window.addEventListener('load', function() { 
			canvas = $('#imageView').get(0);
			context = this.canvas.getContext('2d');
			
			// Auto-adjust canvas size to fit window.
			canvas.width  = 1000; //window.innerWidth - 75;
			canvas.height = 300; //window.innerHeight - 75;
				
			// Create maze.
			maze = new mazeManager(context);
			maze.draw();
			
			// Create walker at starting position.
			walker = new walkerManager(context, maze, 42, 0); //2, 0);
			walker.init();

			algorithm = new alwaysRightAlgorithm(walker, maze.solution);

			$('#btnGo').click(function() {
				run();
			});
		});
	}
});

function run() {
	if (!algorithm.isDone()) {
		algorithm.step();
		
		window.setTimeout(function() {
			run();
		}, 50);
	}
	else {
		$('#txtStatus').text('Done!');
		
		// Clear map.
		maze.draw(true);
		
		// Draw solution path.
		for (var x = 0; x < maze.width; x++) {
			for (var y = 0; y < maze.height; y++) {
				if (walker.visited[x][y] == 1) {
					this.context.fillStyle = 'red';
					this.context.fillRect(x * 10, y * 10, 10, 10);					
				}
			}
		}
	}
}