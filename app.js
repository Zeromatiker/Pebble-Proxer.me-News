var UI = require('ui');
var ajax = require('ajax');

var main = new UI.Menu({
  sections: [{
    items: [{
      title: 'Proxer News',
      icon: 'images/menu_icon.png',
	    subtitle: 'Loading...'
    }]
	}]
});

function show(items1, show_update){
	console.log('show it, items1: ' + items1);
	if (show_update !== true){
		items1.unshift({title: 'Update', subtitle: 'check for News'});
		console.log('next: ');
	}
	main.items(0, items1);
	console.log('fertig! geshowt');
}

function request(){
		ajax({
			url:'http://proxer.me/notifications?format=json&s=news&p=1',
			type: 'json'
		},
		function(data) {
			return data;
		},
		function(error) {
			console.log('rquest_error');
			show([{ title: 'No Connection', subtitle: '-> No News' }]);
		}
	);
}

main.show();

var data = request();
if(data.error !== 0){
				show([{title: 'Fehler', subtitle: data.msg }]);
			} else {
				var items = [];
				for(var i = 0; i < data.notifications.length; i++){
					console.log('run: ' + i);
					items.push({
						title: data.notifications[i].subject, 
						subtitle: data.notifications[i].description
					});
				}
				console.log(items.length + ' items: ' + items);
				items.push({title: 'Load more', subtitle: 'next page'});
				show(items);
			}
			main.on('select', function(e) {
				console.log(e.itemIndex);
				if (e.itemIndex === 0){
					console.log('updating');
					show([{ title: 'Updating...', subtitle: '4 test' }], true);
//					request();
				} else if (e.itemIndex == (items.length - 1)){
					console.log('get new news');
				} else if (data.error === 0) {
					var card = new UI.Card();
					card.title(items[e.itemIndex].title);
					card.body(items[e.itemIndex].subtitle);
					card.scrollable(true);
					card.show();
				}
			});

request();
