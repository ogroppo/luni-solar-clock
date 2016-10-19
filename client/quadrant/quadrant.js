quadrantR = 90; 
hourMarkerR = 78;
hourFontSize = 10;

markerExcursion = 16;
markerExcursionMins = markerExcursion / 60;

hoursMinsSeparation = 14;

Template.quadrant.created = function(){
	setHourMarkers();
}

Template.quadrant.helpers({
	hourMarkers: function() {
		return Session.get('hourMarkers');
	}
});



setHourMarkers = function(){
	var now = moment();
	if(_m)
		now = _m;

	var _markers = [];
	for (var i = 1; i <= dayHoursCount; i++) {
		var marker = {};
		marker.deg = hourDegUnit*i;			
		marker.index = i;
		marker.hour = i;
		marker.hourX = degToX(marker.deg, {offset: 90, r: hourMarkerR});
		marker.hourY = degToY(marker.deg, {offset: 90, r: hourMarkerR});

		if(i === now.hours()){
			marker.current = 'current';	
			marker.mins = now.format('mm');
			
			if(Session.get('dayLight'))
				marker.hourFill = 'orange'
			else if(Session.get('moonLight'))
				marker.hourFill = 'lightBlue';
			else
				marker.hourFill = 'lightGrey';

			var maxExc = hourMarkerR - markerExcursion;
			var relExcursion = now.minutes() * markerExcursionMins;
			if(relExcursion < (markerExcursion * 3 / 2) )
				relExcursion *= 0.5;
			else
				relExcursion *= 1.1;
			var hoursExc = maxExc + relExcursion;
			marker.hourX = degToX(marker.deg, {offset: 90, r: hoursExc});
			marker.hourY = degToY(marker.deg, {offset: 90, r: hoursExc});
		}else{
			marker.hourFill = 'white';
		}

		if(i === now.hours() + 1){
			var relExcursion = now.minutes() * markerExcursionMins;
			if(relExcursion < (markerExcursion * 3 / 2) )
				relExcursion *= 1.2;
			else
				relExcursion *= 0.5;
			
			var nextHourExcursion = hourMarkerR - relExcursion;			
			marker.hourX = degToX(marker.deg, {offset: 90, r: nextHourExcursion});
			marker.hourY = degToY(marker.deg, {offset: 90, r: nextHourExcursion});
		}

		// if(i === 12){
		// 	marker.nameY = -60;
		// 	marker.name = 'noon';
		// }
		// if(i === 24){
		// 	marker.nameY = 60;
		// 	marker.name = 'night';
		// }

		_markers.push(marker);
	};

	Session.set('hourMarkers', _markers);

}