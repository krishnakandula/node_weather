const yargs = require('yargs');
const axios = require('axios');
const weatherConfig = require('./config/weather_Config');

const argv = yargs
	.options({
		a: {
			demand:true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

let encodedAddr = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}`;

axios.get(geocodeUrl).then((response) => {
	if(response.data.status === 'ZERO_RESULTS')
		throw new Error('Unable to find that address.')

	let latitude = response.data.results[0].geometry.location.lat;
	let longitude = response.data.results[0].geometry.location.lng;
	let weatherUrl = `https://api.darksky.net/forecast/${weatherConfig.api_key}/${latitude},${longitude}`;
	console.log(response.data.results[0].formatted_address);

	return axios.get(weatherUrl);
}).then((response) => {
	let temperature = response.data.currently.temperature;
	let apparentTemperature = response.data.currently.apparentTemperature;

	console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((error) => {
	if(error.code === 'ECONNREFUSED')
		console.log('Unable to connect to API servers');
	else
		console.log(error.message);
});
