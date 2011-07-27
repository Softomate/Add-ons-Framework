softomate.browser.attachEvent('DocumentComplete', function(e){
	var body = document.getElementsByTagName('body')[0];
	if (!body)
		return;
	var div = document.createElement("div");
	div.setAttribute('id', 'QRCodeBox')
	div.style.zIndex = 65000;
	div.style.position = "absolute";
	div.style.width = "100px";
	div.style.height = "100px";
	div.style.top = "4px";
	div.style.right = "4px";
	div.style.border = "3px solid black";
	div.style.background = "url(http://chart.apis.google.com/chart?chf=bg,s,FFFFFF&chs=100x100&cht=qr&chl=" + window.location + ")";
	body.appendChild(div);	
});
softomate.extension.attachEvent('removeImage', function(e) {
	var body = document.getElementsByTagName('body')[0];
	if (!body)
		return;
	var div = document.getElementById('QRCodeBox');	
	if (div)
		body.removeChild(div);
});