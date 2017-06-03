// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
	// entry: 'device_livingroom.js',
	// entry: 'device_bedroom.js',
	format: 'es',
	plugins: [
		commonjs(),
		json()
	],
	external: ['Wifi', 'DHT11', 'ESP8266'],
	// dest: 'dist/livingroom.js' // equivalent to --output
	// dest: 'dist/bedroom.js' // equivalent to --output
};