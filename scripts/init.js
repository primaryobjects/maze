var controller = new mazeController();

$(function() {
	if (window.addEventListener) {
		window.addEventListener('load', function() {
			// Read any maze provided in the url querystring ?maze={start: {x: 3, y: 0}, end: {x: 6, y: 0}, width: 20, height: 10, map: '**** **** ...'}
			commonManager.readCustomMaze();
			
			// Include the desired maze in maze.html (mazes/big.js, mazes/little.js, etc.) or via querystring.
			controller.init(maze);
			
			$('#btnGo').click(function() {
				if (!$('#btnGo').hasClass('disabled')) {
					$('#btnGo').addClass('disabled');
					$('#btnGo').text('Running ..');
					
					controller.init(maze); // clear maz
					controller.run();
				}
			});
			
			$('#detailsDiv').click(function() {
				if ($('#details').is(':visible')) {
					$('#detailsDivIcon').attr('class', 'icon-plus-sign');
				}
				else {
					$('#detailsDivIcon').attr('class', 'icon-minus-sign');
				}

				// Slide up/down the options.
				$("#details").slideToggle("fast");			
			});		

			$('#customDiv').click(function() {
				if ($('#custom').is(':visible')) {
					$('#customDivIcon').attr('class', 'icon-plus-sign');
				}
				else {
					$('#customDivIcon').attr('class', 'icon-minus-sign');
				}

				// Slide up/down the options.
				$("#custom").slideToggle("fast");
			});
			
			$('#customizeLink').click(function() {
				// Slide up/down the options.
				$("#custom").slideToggle("fast");
			});
		});
	}
});
