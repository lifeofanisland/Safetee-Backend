var config = {
	local: {
		mode: 'local',
		port: 3000,
		mongo: {
			host: '127.0.0.1',
			port: 27017
		}
	},
	staging: {
		mode: 'staging',
		port: 4000,
		mongo: {
			host: '127.0.0.1',
			port: 27017
		}
	},
	deploy: {
		mode: 'deploy',
		port: 8080,
		mongo: {
			host: 'safetee:safetee@ds048319.mlab.com',
			port: 48319
		}
	},
	production: {
		mode: 'production',
		port: 5000,
		mongo: {
			host: '127.0.0.1',
			port: 27017
		}
	}
};
module.exports = function(mode){
	return config[mode || process.argv[2] || 'deploy'] || config.deploy;
};