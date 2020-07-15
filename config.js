/*
* Create and export various config variables
*
*/

// Container for all environments

var environments = {};

// Development environment (default)

environments.development = {
    'port' : 3000,
    'env' : 'development'
}

environments.production = {
    'port': 5000,
    'env': 'production'
}

// Determine which environment was passed as a command line argument

var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// check that the environment is one of the environments above, if not default to development
var environmentToExport = typeof (environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments['development']; 

// export the module

module.exports = environmentToExport;