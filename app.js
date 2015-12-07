var UI = require('ui');
var ajax = require('ajax');

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

ajax({
		url:'http://proxer.me/notifications?format=json&s=news&p=1',
		type: 'json'
	},
	function(data) {
		var items = [];
		for(var i = 0; i < 10; i++) {
			items.push({
				title: data.notifications[i].subject, 
				subtitle: data.notifications[i].description
			});
		}
		main.items(0, items);
		
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

