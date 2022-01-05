const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
    .keys({
      NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
      PORT: Joi.number().default(3000),

      DB_USERNAME_DEVELOPMENT: Joi.string().required(),
      DB_PASSWORD_DEVELOPMENT: Joi.string(),
      DB_DATABASE_DEVELOPMENT: Joi.string().required(),
      DB_LOGGING_DEVELOPMENT: Joi.boolean(),
      DB_HOST_DEVELOPMENT: Joi.string().required(),
      DB_DIALECT_DEVELOPMENT: Joi.string().required(),

      DB_USERNAME_TEST: Joi.string().required(),
      DB_PASSWORD_TEST: Joi.string(),
      DB_DATABASE_TEST: Joi.string().required(),
      DB_LOGGING_TEST: Joi.boolean(),
      DB_HOST_TEST: Joi.string().required(),
      DB_DIALECT_TEST: Joi.string().required(),

      DB_USERNAME_PRODUCTION: Joi.string().required(),
      DB_PASSWORD_PRODUCTION: Joi.string(),
      DB_DATABASE_PRODUCTION: Joi.string().required(),
      DB_LOGGING_PRODUCTION: Joi.boolean(),
      DB_HOST_PRODUCTION: Joi.string().required(),
      DB_DIALECT_PRODUCTION: Joi.string().required(),

      JWT_SECRET: Joi.string().required().description('JWT secret key'),
      JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
      JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
      JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
          .default(10)
          .description('minutes after which reset password token expires'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envSettings = {
  "development": {
    "username": envVars.DB_USERNAME_DEVELOPMENT,
    "password": envVars.DB_PASSWORD_DEVELOPMENT,
    "database": envVars.DB_DATABASE_DEVELOPMENT,
    "logging": envVars.DB_LOGGING_DEVELOPMENT,
    "host": envVars.DB_HOST_DEVELOPMENT,
    "dialect": envVars.DB_DIALECT_DEVELOPMENT
  },
  "test": {
    "username": envVars.DB_USERNAME_TEST,
    "password": envVars.DB_PASSWORD_TEST,
    "database": envVars.DB_DATABASE_TEST,
    "logging": envVars.DB_LOGGING_TEST,
    "host": envVars.DB_HOST_TEST,
    "dialect": envVars.DB_DIALECT_TEST
  },
  "production": {
    "username": envVars.DB_USERNAME_PRODUCTION,
    "password": envVars.DB_PASSWORD_PRODUCTION,
    "database": envVars.DB_DATABASE_PRODUCTION,
    "logging": envVars.DB_LOGGING_PRODUCTION,
    "host": envVars.DB_HOST_PRODUCTION,
    "dialect": envVars.DB_DIALECT_PRODUCTION
  }
};


module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  },
};

if (envVars.NODE_ENV) {
  if(envVars.NODE_ENV === 'development') {
    module.exports.development = envSettings.development;
  }
  else if(envVars.NODE_ENV === 'test') {
    module.exports.test = envSettings.test;
  }
  else if(envVars.NODE_ENV === 'production') {
    module.exports.production = envSettings.production;
  }
}
