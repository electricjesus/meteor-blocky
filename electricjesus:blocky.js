Meteor.startup(function() {

Template.registerHelper('blky_content', function(template, kw) {
	var options = this;

	var content = Blaze.toHTML(template.renderFunction() || "");	
	var version = options.version || "default";
	
	if(options && !options.name) 	return "[Must declare a name for this block.]";	

	options =  _.pick(options,'name','version');

	var sub = Meteor.subscribe('blocky', options);

	if(sub.ready()) {

		var fbs = Blocky.find(options);
		var blocky;

		if(fbs.count()) {
			blocky = Blocky.findOne(options);
		} else {
			var id = Blocky.insert({
				name: options.name, 
				version: version, 
				content: content,
				added: new Date()				
			});

			blocky = Blocky.find({_id: id});
		}

	}

	var canEdit;

	if(	Meteor.userId &&		// depends on accounts-base
		Roles && 				// depends on alanning:roles
		BlockyConfig && 	// expects BlockyConfig.roles
		typeof BlockyConfig.roles === 'object'	// roles must be array
	)  {
		canEdit = Roles.userIsInRole(Meteor.userId(), BlockyConfig.roles);
	} else {
		// fallback to canEdit if logged in.
		canEdit = !!!Roles && (!!Meteor.user && !!Meteor.user()); 
	}

    return canEdit ? 
	    "<span class=\"blocky\" data-id=\"" + (blocky && blocky._id) + "\">" + 
	    (blocky && blocky.content) + 
	    "</span>"
	  : (blocky && blocky.content)
    ;
});

var createDOM = function(str) {
	var parent = document.createElement('div');
		parent.innerHTML = str;
	return parent.firstChild;
};

Template.blky.rendered = function() {	
};

Template.blky.events({
	'click span.blocky' : function(e) {
		var target = $(e.currentTarget);			
		var data = target.data();		
		var id = data && data.id;

		target.children().css({textDecoration: 'underline'})

		var editor = Blaze.toHTMLWithData(Template['blky_editor'], Blocky.findOne({_id : id}));
		if(!!vex) {
			vex.defaultOptions.className = 'vex-theme-default';
			vex.dialog.open({
				message: 'Editing block <small>(id: '+ id +')</small>',
				input: editor,
				callback: function(data) {
					target.children().removeAttr('style');
					Blocky.update({_id: data._id}, {$set : {content: data.content}});
				}
			});
		}
	}
})

});


