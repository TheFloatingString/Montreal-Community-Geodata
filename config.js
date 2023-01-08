const env = process.env;

const config = {
	db: {
		user: env.USER,
		host: env.HOST,
		password: env.PASSWORD,
		database: env.DATABASE,
		port: env.POSTGRES_PORT,
		ssl: (env.SSL_CONFIG === 'true'),
	}
};

module.exports = config 
