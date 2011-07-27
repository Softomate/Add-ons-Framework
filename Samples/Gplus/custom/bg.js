var iDelay = 60, //-- delay in seconds
	iUnreadedCount = 0,
	iRequestTimeout = 500,
	iRequestFailureCount = 0;

function init() {
	startRequest();
	softomate.ui.button.setBadgeBackgroundColor('#cc3c29');
	softomate.ui.button.attachEvent('ButtonClick', function () {
		goToInbox();
	});
}

function scheduleRequest() {
	delay = iDelay*1000;
	window.setTimeout(startRequest, delay);
}

function startRequest() {
	getInboxCount( function(count) {
			console.log(count);
			updateUnreadCount(count);
			scheduleRequest();
		},function() {
			showLoggedOut();
			scheduleRequest();
		}
	);
}

function getInboxCount(onSuccess, onError) {
	var xhr = new XMLHttpRequest(),
	abortTimerId = window.setTimeout(function() {
		xhr.abort();  // synchronously calls onreadystatechange
	}, iRequestTimeout);

	function handleSuccess(count) {
		iRequestFailureCount = 0;
		window.clearTimeout(abortTimerId);
		if (onSuccess)
			onSuccess(count);
	}
	function handleError() {
		++iRequestFailureCount;
		window.clearTimeout(abortTimerId);
		if (onError)
			onError();
	}

	xhr.onreadystatechange = function(){
		console.log(xhr);
		if (xhr.readyState != 4)
			return;
		if (xhr.status == 404){
			handleError();
			return;
		}
		if (xhr.responseText) {
			var match = /['"]a-za-Tf['"],['"]300['"], ([0-9]+).0/i.exec(xhr.responseText);
			if(null != match){
				handleSuccess(match[1]);
			}
			return;
		}
		handleError();
	}

	xhr.onerror = function(error) {
		handleError();
	}
	xhr.open('GET', 'https://plus.google.com/u/0/_/notifications/frame', true);
	xhr.send(null);
}

function updateUnreadCount(count) {
	softomate.ui.button.setIcon('gplus_16.png');
	softomate.ui.button.setBadgeText(count);
}

function showLoggedOut() {
	iUnreadedCount = 0;
	softomate.ui.button.setBadgeText('');
	softomate.ui.button.setIcon('gplus_16_off.png');
}

function goToInbox() {
	softomate.browser.navigate({
		'url': 'https://plus.google.com/'
	});
}


init();
