var moonriseM, moonsetM, lunarMidnightM;
Moon = function(riseM, setM){
	this.lightMins = calcLightMins(riseM, setM);
	var _noon = calcNoon(riseM, this.lightMins);
	this.noon = _noon.format();
	this.rise = riseM.format();
	this.set = setM.format();
	this.deg = calcNoonDeg(_noon);
	this.r = calcR(this.lightMins);
	this.cy = latY;
}

moonFromData_v1 = function(data){
	var now = moment();
	if(_m)
		now = _m;

	data.moondata.forEach(function(entry, index){
		if(entry.phen === 'R'){
			moonriseM = parseTime_v1(entry);
		}

		if(entry.phen === 'U'){
			lunarMidnightM = parseTime_v1(entry).add(12, 'hours');
		}

		if(entry.phen === 'S'){
			moonsetM = parseTime_v1(entry);
		}
	});

	//U can happen on different date
	if(!lunarMidnightM){
		var diff = moonriseM.diff(moonsetM,'minutes');
		lunarMidnightM = moonsetM.clone().add(diff/2,'minutes');
	} 

	if(now >= lunarMidnightM){
		getNextMoonData_v1(data, now.clone().add(1,'day'));
	}else{
		getPrevMoonData_v1(data, now.clone().add(-1,'day'));
	}
}

buildMoon = function(moonriseM, moonsetM){
	var moon = new Moon(moonriseM, moonsetM);
	Session.set('moon', moon);
}


getNextMoonData_v1 = function(data, M){
	if(!moonsetM || moonsetM < moonriseM){
		if(data.nextmoondata){
			data.nextmoondata.forEach(function(entry, index){
				if(entry.phen === 'S'){
					var nextDayMoonset = parseTime_v1(entry);
					moonsetM = nextDayMoonset.add(1,'day');							
				}
			});
			buildMoon(moonriseM, moonsetM);
		}else{
			HTTP.call("GET", "http://api.usno.navy.mil/rstt/oneday",
				{params: 
					{
						date: M.format('MM/DD/YYYY'), 
						coords: Session.get('formattedCoords'),
						tz: Session.get('timezone')
					}
				},
				function (error, result) {
					if(result){
						var data = JSON.parse(result.content);
						data.moondata.forEach(function(entry, index){
							if(entry.phen === 'S'){
								var nextDayMoonset = parseTime_v1(entry);
								moonsetM = nextDayMoonset.add(1,'day');		
							}
						});
						buildMoon(moonriseM, moonsetM);
					}
				}
			);
		}
	}else{
		buildMoon(moonriseM, moonsetM);
	}
}

getPrevMoonData_v1 = function(data, M){
	if(!moonriseM || moonriseM > moonsetM ){
		if(data.prevmoondata){
			data.prevmoondata.forEach(function(entry, index){
				if(entry.phen === 'R'){
					var prevDayMoonrise = parseTime_v1(entry);
					moonriseM = prevDayMoonrise.subtract(1,'day');
				}
			});
			buildMoon(moonriseM, moonsetM);
		}else{
			HTTP.call("GET", "http://api.usno.navy.mil/rstt/oneday",
				{params: 
					{
						date: M.format('MM/DD/YYYY'), 
						coords: Session.get('formattedCoords'),
						tz: Session.get('timezone')
					}
				},
				function (error, result) {
					if(result){
						var data = JSON.parse(result.content);
						data.moondata.forEach(function(entry, index){
							if(entry.phen === 'R'){
								var prevDayMoonrise = parseTime_v1(entry);
								moonrisetM = prevDayMoonrise.subtract(1,'day');
							}
						});
						buildMoon(moonriseM, moonsetM);
					}
				}
			);
		}
	}else{
		buildMoon(moonriseM, moonsetM);
	}
}