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

function request(){
		ajax({
			url:'http://proxer.me/notifications?format=json&s=news&p=1',
			type: 'json'
		},
		function(data) {
			console.log('data_function');
			var items = [];
			for(var i = 0; i < 15; i++) {
				items.push({
					title: data.notifications[i].subject, 
					subtitle: data.notifications[i].description
				});
			}
			console.log(items + ' + ' + items.length);
			show(items);
		},
		function(error) {
			console.log('rquest_error');
			show([{title: 'No Connection', subtitle: '-> No News' }]);
		}
	);
}

function show(items){
	console.log('show it');
	items.push({title: 'Load more', subtitle: 'next page'});
	items.unshift({title: 'Update', subtitle: 'check 4 News'});
	main.items(0, items);
	console.log('fertig!');
}

main.show();

request();



/*
function itemgenerator(data, data_old){
	var items = [];
	for(var i = 0; i < data.notifications.lenght; i++) {
		items.push({
			title: data.notifications[i].subject, 
			subtitle: data.notifications[i].description
		});
	}
	if(data.notifications[0].subject != data_old){
		return items;
	}
	else console.log("nichts neues");
}


			main.items(0, itemgenerator(data));

			main.on('accelTap', function(e) {
				var data_old = data.notifications[0].subject;
				ajax({
					url:'http://proxer.me/notifications?format=json&s=news&p=1',
					type: 'json'
				},function(data) {
					main.items(0, itemgenerator(data, data_old));
				});
			});
			main.on('select', function(e) {
				var card = new UI.Card();
				card.title(data.notifications[e.itemIndex].subject);
				card.body(data.notifications[e.itemIndex].description);
				card.scrollable(true);
				card.show();
			});*/
