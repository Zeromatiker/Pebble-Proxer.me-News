var UI = require('ui');
var ajax = require('ajax');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');

var main = new UI.Menu({
  sections: [{
    items: [{
      title: 'Proxer News',
      icon: 'images/menu_icon.png',
	    subtitle: 'Loading News'
    }]
	}]
});

main.show();

function itemgenerator(data, data_old){
	var items = [];
	for(var i = 0; i < data.notifications.lenght; i++) {
		items.push({
			title: data.notifications[i].subject, 
			subtitle: data.notifications[i].description
		});
	}
	if(data.notifications[0].subject != data_old){
		Vibe.vibrate('short');
		return items;
	}
	else console.log("nichts neues");
}

ajax({
		url:'http://proxer.me/notifications?format=json&s=news&p=1',
		type: 'json'
	},
	function(data) {
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
	});
	},
	function(error) {
		main.items(0, [{title: 'Keine Verbindung', subtitle: 'News konnten nicht abgerufen werden' }]);
	}
);

Accel.init();

