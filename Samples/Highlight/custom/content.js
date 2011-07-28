function getTextNodesIn(node) {
	var textNodes = [];
	if (node.nodeType == 3) {
		textNodes.push(node);
	} else {
		var children = node.childNodes;
		for (var i = 0, len = children.length; i < len; ++i) {
			if((children[i].nodeName != 'SCRIPT') && (children[i].nodeName != 'STYLE'))
				textNodes.push.apply(textNodes, getTextNodesIn(children[i]));
		}
	}
	return textNodes;
}
function setSelectionRange(el, words) {
	if (document.createRange && window.getSelection) {
		var range = document.createRange();
		range.selectNodeContents(el);
		for (var x in words) {
			var word = words[x];		
			var textNodes = getTextNodesIn(document.body);
			for (var i = 0, textNode; i < textNodes.length; i++) {
				var textNode = textNodes[i];
				var start = textNode.nodeValue.length - 1;

				while (textNode.nodeValue.lastIndexOf(word, start) >= 0 ) {
					range.setStart(textNode, textNode.nodeValue.lastIndexOf(word, start));
					range.setEnd(textNode, textNode.nodeValue.lastIndexOf(word, start) + word.length);
					var highlightDiv = document.createElement('span');
					highlightDiv.style.backgroundColor = 'yellow';
					range.surroundContents( highlightDiv );
					start = textNode.nodeValue.lastIndexOf(word, start);
				}
			}
		}

	}
}
softomate.browser.attachEvent('DocumentComplete', function(e){
	if (document.body)
		softomate.extension.getItem('words', function(words) {
			words = (words && words != 'undefined') ? JSON.parse(words) : [];
			softomate.extension.fireEvent('updateBadge', words.length);
			setSelectionRange(document.body, words);
		});
});
softomate.extension.attachEvent('AddWord', function(e) {
	softomate.extension.getItem('words', function(words) {
		words = words ? JSON.parse(words) : [];
		var word = window.getSelection().toString();
		if (word.length == 0)
			return;
		words.push(word);
		if (words.length > 100)
			words.shift();
		softomate.extension.setItem('words', JSON.stringify(words));
		if (document.body)
			setSelectionRange(document.body, words);
		softomate.extension.fireEvent('updateBadge', words.length);
	});
});