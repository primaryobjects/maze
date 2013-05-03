var controller = new mazeController();

$(function() {
	if (window.addEventListener) {
		window.addEventListener('load', function() {
			// Read any maze provided in the url querystring ?maze={start: {x: 3, y: 0}, end: {x: 6, y: 0}, width: 20, height: 10, map: '**** **** ...'}
			commonManager.readCustomMaze();
			
			// Include the desired starting maze in maze.html (mazes/big.js, mazes/little.js, etc.) or via querystring.
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
			
			$('.loadMaze').click(function() {
				// Hide the details panel.
				$('#customDiv').click();
				
				// Import the script into the browser.
				commonManager.loadCustomMaze($(this).data('file'));

				// Hide the canvas as show the loading text.
				$('#canvasDiv').hide();
				$('#canvasStatus').text('loading maze ..');
				
				// Wait for script to load.
				window.setTimeout(function() { $('#canvasStatus').text(''); $('#canvasDiv').show(); controller.init(maze); }, 3000);
			});
			
			// Add click event on the radio buttons.
			$('div.btn-group[data-toggle-name=*]').each(function() {
				var group   = $(this);
				var name    = group.data('toggle-name');
				var hidden  = $('input[name="' + name + '"]');
				$('button', group).each(function(){
				  var button = $(this);
				  button.live('click', function(){
					  hidden.val($(this).val());
					  
					  // De-select active button.
					  $('button.active').removeClass('active');
					  
					  // Set active button.
					  button.addClass('active');
					  
					  // Load algorithm script.
					  this.algorithm = null;
					  commonManager.loadScript($('#algorithmType').val());					  
				  });
				});
			});
		});
	}
});
