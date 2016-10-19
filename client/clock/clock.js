Template.clock.created = function(){

	Session.set('formattedCoords', "51.5074N,0.1278W");
	Session.set('timezone', 1);

	_m = moment().add(-391,'minutes');
	setLuniSolar();
	Meteor.setInterval(function(){
		setLuniSolar();
	}, 60000);
	
	Meteor.setInterval(function(){
		setHourMarkers();
		setTimeMarker();
	}, 1000);


};

Template.clock.helpers({
	sun() {
		return Session.get('sun');
	},
	moon() {
		return Session.get('moon');
	}
});

function setLuniSolar(){
	var now = moment();
	if(_m)
		now = _m;
	
	HTTP.call("GET", "http://api.usno.navy.mil/rstt/oneday",
		{params: 
			{
				date: now.format('MM/DD/YYYY'), 
				coords: Session.get('formattedCoords'),
				tz: Session.get('timezone')
			}
		},
		function (error, result) {
			if(result){
				var data = JSON.parse(result.content);
				
				sunFromData_v1(data);
				moonFromData_v1(data);
			}
    	}
    );
}