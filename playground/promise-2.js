const request = require('request');

let geocodeAddress = (address) => {
	return new Promise((resolve, reject) => {
		
		let encodedAddr = encodeURIComponent(address);

		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}`,
			json: true
		}, (error, response, body) => {
			if(error)
				reject('ERROR: Could not access Google servers');
			else if(body.status === 'ZERO_RESULTS')
				reject(`Could not find address: ${address}`);
			else if(body.status === 'OK'){
				resolve({
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				});
			}
		});
	});
};

geocodeAddress('19146').then((location) => {
	console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
	console.log(errorMessage);
});