//const geocode = require('./geocode/geocode');
//const yargs = require('yargs');
//
//const argv = yargs
//	.options({
//		a: {
//			demand:true,
//			alias: 'address',
//			describe: 'Address to fetch weather for',
//			string: true
//		}
//	})
//	.help()
//	.alias('help', 'h')
//	.argv;
//
//
//geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//	if(errorMessage)
//		console.log(errorMessage);
//	else
//		console.log(JSON.stringify(results, undefined, 2));
//});

const weatherConfig = require('./config/weather_config');
const request = require('request');

request({
	url: `https://api.darksky.net/forecast/${weatherConfig.api_key}/33.027`,
	json: true
}, (error, response, body) => {
	if(error)
		console.log('Could not connect to ')
	if(response.statusCode == 404)
		console.log('Error');
	else
		console.log(JSON.stringify(body.currently.temperature, undefined, 1));
})