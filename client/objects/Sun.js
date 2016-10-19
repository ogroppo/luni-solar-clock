Sun = function(riseM, setM){
	this.lightMins = calcLightMins(riseM, setM);
	var _noon = calcNoon(riseM, this.lightMins);
	this.noon = _noon.format();
	this.rise = riseM.format();
	this.set = setM.format();
	this.deg = calcNoonDeg(_noon);
	this.r = calcR(this.lightMins);
	this.cy = latY;
}

sunFromData_v1 = function(data){				
	var now = moment();

	var sunriseM, sunsetM;
	data.sundata.forEach(function(entry, index){
		if(entry.phen === 'R'){
			sunriseM = parseTime_v1(entry);
		}

		if(entry.phen === 'S'){				
			sunsetM = parseTime_v1(entry);
		}
	});

	var sun = new Sun(sunriseM, sunsetM);
	Session.set('sun', sun);

}

