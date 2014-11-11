Meteor.publish('blocky', function(options) {	
	return Blocky.find(options, {sort: {added: -1}});
});