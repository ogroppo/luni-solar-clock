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

	var moonriseM, moonsetM, lunarMidnightM;
	data.moondata.forEach(function(entry, index){
		if(entry.phen === 'R' && !lunarMidnightM){
			moonriseM = parseTime_v1(entry);
		}

		if(entry.phen === 'U'){
			lunarMidnightM = parseTime_v1(entry).add(12, 'hours');
		}

		if(entry.phen === 'S' && lunarMidnightM){
			moonsetM = parseTime_v1(entry);
		}
	});

	//if(now >= lunarMidnightM){
		if(!moonsetM){
			if(data.nextmoondata){
				data.nextmoondata.forEach(function(entry, index){
					if(entry.phen === 'S'){
						var nextDayMoonset = parseTime_v1(entry);
						moonsetM = nextDayMoonset.add(1,'day');							
					}
				});
			}else{
				HTTP.call("GET", "http://api.usno.navy.mil/rstt/oneday",
					{params: 
						{
							date: now.add(1,'day').format('MM/DD/YYYY'), 
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
						}
					}
				);
			}
		}
	//}else{
		if(!moonriseM){
			if(data.prevmoondata){
				data.prevmoondata.forEach(function(entry, index){
					if(entry.phen === 'R'){
						var prevDayMoonrise = parseTime_v1(entry);
						moonriseM = prevDayMoonrise.subtract(1,'day');
					}
				});
			}else{
				HTTP.call("GET", "http://api.usno.navy.mil/rstt/oneday",
					{params: 
						{
							date: now.subtract(1,'day').format('MM/DD/YYYY'), 
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
						}
					}
				);
			}
		}
	//}

	var moon = new Moon(moonriseM, moonsetM);
	Session.set('moon', moon);
}