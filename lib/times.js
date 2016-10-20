parseTime_v1 = function(entry){
	var now = moment();
	if(_m)
		now = _m;
	
	var rise = entry.time.split(':');
	var riseHours = rise[0];
	var riseMins = rise[1];
	return now.clone().hour(riseHours).minute(riseMins);
}