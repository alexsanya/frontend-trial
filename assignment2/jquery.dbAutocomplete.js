(function($)
{
	$.fn.dbAutocomplete = function()
	{
		var inputItem = this;
		var cache = new Map()
		var datalistId = 'suggestions'+Date.now();
		inputItem.parent().append($('<datalist>').attr('id', datalistId));
		inputItem.attr('list', datalistId);
		inputItem.on('keyup', function (event){
			if (isSystemKey(event.which)) {
				return;
			}
			var text = inputItem.val();
			if (cache.has(text)) {
				showSuggestions(datalistId, cache.get(text));
				return;
			}
			$.ajax({
				url: 'https://www.deskbookers.com/en-gb/sa2.json?q='+text
			}).done(function(suggestions){
				cache.set(text, suggestions);
				showSuggestions(datalistId, suggestions);
			});
		});
	};

	function isSystemKey(key) {
		if (key>63 && key<91) return false; //a-z
		if (key>47 && key<58) return false; //0-9
		if ([8, 188, 189, 190].indexOf(key) >=0) return false; //backspace, dot, comma, dash
		return true;
	}

	function showSuggestions(datalistId, suggestions) {
		var datalistNode = $('#'+datalistId);
		datalistNode.html('');
		suggestions.forEach(function (venue) {
			datalistNode.append($('<option>').attr('value', venue.short));
		});
	}
})(jQuery);
