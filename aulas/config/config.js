const env = process.env.NODE_ENV || 'dev';

const config = () => {
  switch (env) {
    case 'dev':
      return {
        bdString: 'mongodb://localhost/apis-nodejs',
        jwt_pass: 'password_banana',
        jwt_expires_in: '1d'
      }
      case 'hml': 
      return {
        bdString: 'mongodb://localhost/apis-nodejs', 
        jwt_pass: 'password_banana',
        jwt_expires_in: '1d'
      }
      case 'prod': 
      return {
        bdString: 'mongodb://localhost/apis-nodejs',
        jwt_pass: 'password_banana',
        jwt_expires_in: '1d'
      };
  }
};

console.log(`Init API in mode ${env.toLocaleUpperCase()}`);

module.exports = config();