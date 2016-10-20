Template.location.helpers({
	ip: function() {
		return Template.instance().location.get('ip');
	},
	location: function(){
		return Template.instance().location.get('location');
	}
});

Template.location.created = function(){
	this.location = geoip;
	//console.log(this.location);
};