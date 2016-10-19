degToX = function(deg, o = {}){
	var rad = degToRad(deg, o.offset);
	var x = Math.cos(rad);
	if(o.r)
		x *= o.r;

	return Math.floor(x);
}

degToY = function(deg, o = {}){
	var rad = degToRad(deg, o.offset);
	var y = Math.sin(rad);
	if(o.r)
		y *= o.r;

	return Math.floor(y);
}

degToRad = function(deg, offset = 0){
	if(offset)
		deg += offset;

	var rad = deg * (Math.PI / 180);
	return rad;
}

radToDeg = function(rad, offset = 0){
	if(offset)
		deg += offset;
	
	var deg = rad * (180 / Math.PI)
	return deg;
}