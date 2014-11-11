Meteor.startup(function() {

Template.registerHelper('blky_content', function(template, kw) {
	var options = this;
	var content = Blaze.toHTML(template.renderFunction() || "");	
	var version = options.version || "default";
	
	if(options && !options.name) 	return "[Must declare a name for this block.]";	

	var sub = Meteor.subscribe('blocky', options);

	if(sub.ready()) {
		
		var fbs = Blocky.find(options);
		if(fbs.count()) {
			content = Blocky.findOne(options).content;
		} else {
			Blocky.insert({
				name: options.name, 
				version: version, 
				content: content,
				added: new Date()				
			});
		}

	} 	

    return "<span class=\"blocky\" data-name=\"" + options.name + "\">" + content + "</span>";
});

});
