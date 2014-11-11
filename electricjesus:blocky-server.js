Meteor.publish('blocky', function(name, version) {
	return Blocky.find({name: name, version: version});
});