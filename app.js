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

function show(items, next){
	console.log('show it');
	if (next !== true){ 
		items.unshift({title: 'Update', subtitle: 'check for News'});
		items.push({title: 'Load more', subtitle: 'next page'});
		console.log('next: ' + next);
	}
	main.items(0, items);
	console.log('fertig!');
}

function request(){
		ajax({
			url:'http://proxer.me/notifications?format=json&s=news&p=1',
			type: 'json'
		},
		function(data) {
			console.log('data_function: ' + data);
			if(data.error !== 0){			//=?
				show([{title: 'Fehler', subtitle: data.msg }]);
			} else {
				var items = [];
				for(var i = 0; i < data.notifications.lenght; i++) {
					items.push({
						title: data.notifications[i].subject, 
						subtitle: data.notifications[i].description
					});
				}
				console.log(items + ' ; ' + items.length);
				show(items);
			}
			main.on('select', function(e) {
				console.log(e.itemIndex);
				if (e.itemIndex === 0){			//=?
					console.log('updating');
					show([{title: 'Updating...', subtitle: '4 test' }], true);
//					request();
				} else if (data.error === 0) {			//=?
					var card = new UI.Card();
					card.title(items[e.itemIndex].title);
					card.body(items[e.itemIndex].subtitle);
					card.scrollable(true);
					card.show();
				}
			});
		},
		function(error) {
			console.log('rquest_error');
			show([{title: 'No Connection', subtitle: '-> No News' }]);
		}
	);
}

main.show();

request();
