Meteor.startup(function() {

Template.registerHelper('blky_content', function(template, kw) {
	var options = this;
	var content = Blaze.toHTML(template.renderFunction() || "");	
	var version = options.version || "default";
	
	if(options && !options.name) 	return "[Must declare a name for this block.]";	

	var sub = Meteor.subscribe('blocky', options.name, version);

	if(sub.ready()) {

		var fbs = Blocky.find({name: options.name, version: version});
		if(fbs.count()) {
			content = Blocky.findOne({name: options.name, version: version}).content;
		} else {
			Blocky.insert({
				name: options.name, 
				version: version, 
				content: content				
			});
		}

	} 	

    return "<span class=\"blocky\" data-name=\"" + options.name + "\">" + content + "</span>";
});

});
