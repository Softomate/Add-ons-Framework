var count = 0;
softomate.ui.button.attachEvent('ButtonClick', function (e) {
	count++;
	if( (count%2) == 0) {
		softomate.extension.fireEvent('ReloadPage', e);	
		return;
	}
	softomate.extension.fireEvent('ButtonClicked', e);				
});
