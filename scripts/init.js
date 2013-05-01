var controller = new mazeController();

$(function() {
	if (window.addEventListener) {
		window.addEventListener('load', function() { 
			controller.init(maze); // Include the desired maze in maze.html: mazes/big.js, mazes/little.js, etc.
			
			$('#btnGo').click(function() {
				controller.run();
			});
			
			$('#detailsDiv').click(function() {
				// Slide up/down the options.
				$("#details").slideToggle("fast");
			});		
		});
	}
});