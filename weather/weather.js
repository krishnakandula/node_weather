const request = require('request');
const weatherConfig = require('../config/weather_config');

let getWeather = (latitude, longitude, callback) => {
	request({
		url: `https://api.darksky.net/forecast/${weatherConfig.api_key}/${latitude},${longitude}`,
		json: true
	}, (error, response, body) => {
		if(!error && response.statusCode == 200){
			callback(undefined, {
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature
			});
		}
		else
			callback('ERROR: Could not retrieve data.')
	});
};

module.exports = {
	getWeather
}