timeMakerR = 8;
timeMarkerCy = 79;

var timeMarker = {};
timeMarker.sun = {};
timeMarker.moon = {};
timeMarker.r = timeMakerR;
timeMarker.cy = timeMarkerCy;

setTimeMarker = function(){
	var now = moment();
	if(_m)
		now = _m;

	var midnight = now.clone().startOf('day');
	var currentDayMins = now.diff(midnight, 'minutes');

	timeMarker.deg = currentDayMins * minDegUnit;

	timeMarker.mins = now.format('mm');
	timeMarker.minsFill = 'lightGrey';
	timeMarker.minsX = degToX(timeMarker.deg, { r: timeMarkerCy, offset: 90 });
	timeMarker.minsY = degToY(timeMarker.deg, { r: timeMarkerCy, offset: 90 });

	var sun = Session.get('sun');
	var moon = Session.get('moon');
	
	timeMarker.sun.opacity = "0";
	if(now > moment(sun.rise) && now < moment(sun.set)){
		Session.set('dayLight', true);
		timeMarker.minsFill = 'black';
		var riseDiff = now.diff(moment(sun.rise), 'minutes');
		var setDiff = moment(sun.set).diff(now, 'minutes');
		if(riseDiff < twilightMins)
			timeMarker.sun.opacity = twilightMinsOpacityUnit * riseDiff;
		else if(setDiff < twilightMins)
			timeMarker.sun.opacity = twilightMinsOpacityUnit * setDiff;
		else
			timeMarker.sun.opacity = 1;
	}else{
		Session.set('dayLight', false);
	}

	timeMarker.moon.opacity = "0";
	if(now > moment(moon.rise) && now < moment(moon.set)){
		Session.set('moonLight', true);
		timeMarker.minsFill = 'black';
		var riseDiff = now.diff(moment(moon.rise), 'minutes');
		var setDiff = moment(moon.set).diff(now, 'minutes');
		if(riseDiff < twilightMins)
			timeMarker.moon.opacity = twilightMinsOpacityUnit * riseDiff;
		else if(setDiff < twilightMins)
			timeMarker.moon.opacity = twilightMinsOpacityUnit * setDiff;
		else
			timeMarker.moon.opacity = 1;

		var lowerCy = (timeMarkerCy - timeMakerR);
		var upperCy = (timeMarkerCy + timeMakerR);
		var sunMoonAngle = moon.deg - sun.deg;
		if(sunMoonAngle < 0)
			sunMoonAngle = 360 + sunMoonAngle;
		var leftA = 0;
		var rightA = 0;
		var shadowDegUnit = timeMakerR / 90;

		if( sunMoonAngle >= 270 ){
			timeMarker.moon.type = 'dark';
			leftA = shadowDegUnit * (sunMoonAngle - 270);
			rightA = timeMakerR;
		}else if( sunMoonAngle >= 180 ){
			timeMarker.moon.type = 'light';
			leftA = 0;
			rightA = timeMakerR - (shadowDegUnit * (sunMoonAngle - 180) );
		}else if( sunMoonAngle >= 90 ){
			timeMarker.moon.type = 'light';
			leftA = timeMakerR - (shadowDegUnit * (sunMoonAngle - 90) );
			rightA = 0;
		}else{
			timeMarker.moon.type = 'dark';
			leftA = timeMakerR;
			rightA = timeMakerR - (shadowDegUnit * sunMoonAngle);
		}

		timeMarker.moon.leftD = "M 0,"+lowerCy+" A "+leftA+","+timeMakerR+" 0 1 1 0,"+upperCy;
		timeMarker.moon.rightD = "M 0,"+lowerCy+" A "+rightA+","+timeMakerR+" 0 1 0 0,"+upperCy;
	}else{
		Session.set('moonLight', false);
	}

	Session.set('timeMarker', timeMarker);
}

Template.timeMarker.helpers({
	timeMarker: function() {
		return Session.get('timeMarker');
	}
});