var commonManager = {
	getParameterByName: function(name) {
	  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	  var regexS = "[\\?&]" + name + "=([^&#]*)";
	  var regex = new RegExp(regexS);
	  var results = regex.exec(window.location.search);
	  if (results == null) {
		return "";
	  }
	  else {
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	  }
	},

	readCustomMaze: function() {
		var param = commonManager.getParameterByName('maze');
		if (param != null && param.length > 0) {
			var data = JSON.parse(param);
			if (data.map != null && data.width > 0 && data.height > 0) {
				// Valid maze data.
				maze = data;
				
				return true;
			}
		}
		
		return false;
	}
};