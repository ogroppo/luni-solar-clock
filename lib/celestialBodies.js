calcLightMins = function(riseM, setM){
	return setM.diff(riseM, 'minutes');
}

calcNoon = function(riseM, lightMins){
	return riseM.clone().add(lightMins/2, 'minutes');
}

calcNoonDeg = function(noonM){
	var clockNoon = noonM.clone().hour(12).minute(00);
	var noonOffsetMins = noonM.diff(clockNoon, 'minutes');

	return noonOffsetMins * minDegUnit;
}

calcR = function(lightMins){
	var arcMins = lightMins/2;
	var deg = 90 - (arcMins * minDegUnit);
	var intersecX = degToX(deg, { r: 90 });
	var intersecY = degToY(deg, { r: 90 });
	var r = Math.sqrt( Math.pow(intersecX, 2) + Math.pow(intersecY - Math.abs(latY), 2));
	return r;
}
