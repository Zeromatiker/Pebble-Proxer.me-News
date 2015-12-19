var UI = require('ui');
var ajax = require('ajax');

var request_items;			//4 global use
var request_error;

var last_request = 0;			//anti Spam
var time = new Date();

var main = new UI.Menu({
  sections: [{
    items: [{
      title: 'Loading...',
	    subtitle: 'downloading news'
    }]
	}]
});

function show(items1, show_update){
	if (show_update !== true){
		items1.unshift({title: 'Update', subtitle: 'check for News'});
	}
	main.items(0, items1);
}

function request(){
	ajax({
			url:'http://proxer.me/notifications?format=json&s=news&p=1',
			type: 'json'
		},
		function(data) {
			if(data.error !== 0){
				show([{title: 'Server Error', subtitle: data.msg }]);
			} else {
				var items = [];
				for(var i = 0; i < data.notifications.length; i++){
					items.push({
						title: data.notifications[i].subject, 
						subtitle: data.notifications[i].description
					});
				}
				request_items = items;			//4 global use
				request_error = data.error;
//				items.push({title: 'Load more', subtitle: 'next page'});
				show(items);
			}
		},
		function(error) {
			show([{ title: 'No Connection', subtitle: '-> No News' }]);
			request_error = 10;
		}
	);
}

main.show();			//first loading screen

request();

main.on('select', function(e) {
	if (e.itemIndex === 0){				//if update entry is selected
		time = new Date();
		if((time.getTime() - last_request) > 5000){
			show([{ title: 'Loading...', subtitle: 'downloading news' }], true);
			request();
			last_request = time.getTime();
		}
//} else if (e.itemIndex == (items.length - 1)){
	} else if (request_error === 0) {			//if a news entry is selected
		var card = new UI.Card();
		card.title(request_items[e.itemIndex].title);
		card.body(request_items[e.itemIndex].subtitle);
		card.scrollable(true);
		card.show();
	}
});
