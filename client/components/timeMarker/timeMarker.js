timeMakerR = 8;
timeMarkerCy = 79;

var timeMarker = {};
timeMarker.sun = {};
timeMarker.moon = {};
timeMarker.r = timeMakerR;
timeMarker.cy = timeMarkerCy;

setTimeMarker = function(){
	try{
	var now = moment();
	if(_m)
		now = _m;

	var midnight = now.clone().startOf('day');
	var currentDayMins = now.diff(midnight, 'minutes');

	timeMarker.deg = currentDayMins * minDegUnit;

	timeMarker.mins = now.format('mm');
	timeMarker.minsFill = 'lightBlue';
	timeMarker.minsX = degToX(timeMarker.deg, { r: timeMarkerCy, offset: 90 });
	timeMarker.minsY = degToY(timeMarker.deg, { r: timeMarkerCy, offset: 90 });

	var sun = Session.get('sun');
	var moon = Session.get('moon');
	
	if(moon){
		timeMarker.moon.opacity = "0";
		if(now > moment(moon.rise) && now < moment(moon.set)){
			Session.set('moonLight', true);
			timeMarker.minsFill = 'grey';
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
			}else if( sunMoonAngle >= 180 ){ //black moon white shapes
				timeMarker.moon.type = 'light';
				leftA = timeMakerR;
				rightA = timeMakerR - (shadowDegUnit * (sunMoonAngle - 180) );
			}else if( sunMoonAngle >= 90 ){
				timeMarker.moon.type = 'light'; //black moon white shapes
				leftA = shadowDegUnit * (sunMoonAngle - 90);
				rightA = timeMakerR;
			}else{
				timeMarker.moon.type = 'dark';
				leftA = timeMakerR;
				rightA = timeMakerR - (shadowDegUnit * sunMoonAngle);
			}

			timeMarker.moon.leftD = "M 0,"+(-timeMakerR)+" A "+leftA+","+timeMakerR+" 0 1 1 0,"+timeMakerR;
			timeMarker.moon.rightD = "M 0,"+(-timeMakerR)+" A "+rightA+","+timeMakerR+" 0 1 0 0,"+timeMakerR;
		}else{
			Session.set('moonLight', false);
		}
	}

	timeMarker.sun.opacity = "0";
	if(sun){
		var riseM = moment(sun.rise);
		var dawnM = riseM.clone().add(-twilightMins, 'minutes');
		var setM = moment(sun.set);
		var duskM = setM.clone().add(twilightMins, 'minutes');
		
		if(now > dawnM && now < duskM){
			timeMarker.minsFill = 'black';
			Session.set('dayLight', true);
			var diff;
			if(now < riseM)
				diff = now.diff(dawnM,'minutes');
			else
				diff = duskM.diff(now,'minutes');

			var opacity = twilightMinsOpacityUnit * diff;
			if(opacity < 0.3)
				opacity = 0.3;
				 
			console.log(opacity);
			timeMarker.sun.opacity = opacity;
		}else{
			Session.set('dayLight', false);
		}

		if(now > riseM && now < setM){
			timeMarker.sun.opacity = 1;
		}


		Session.set('timeMarker', timeMarker);
	}


	}catch(e){
		console.log(e);
	}
}

Template.timeMarker.helpers({
	timeMarker: function() {
		return Session.get('timeMarker');
	}
});