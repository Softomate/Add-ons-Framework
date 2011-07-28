softomate.ui.button.attachEvent('ButtonClick', function(e){
	softomate.extension.fireEvent('AddWord', e);
});

softomate.extension.attachEvent('updateBadge', function(e){
	softomate.ui.button.setBadgeText(e);
});