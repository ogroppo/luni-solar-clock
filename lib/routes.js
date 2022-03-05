FlowRouter.route('/', {
	action: function(params, queryParams) {
		console.log(params,queryParams);
		if(Object.keys(queryParams).length)
			_m = moment().clone()
			.add(queryParams.hours,'hours')
			.add(queryParams.days,'days')
			.add(queryParams.minutes,'minutes');
	}
});