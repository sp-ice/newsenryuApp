var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

module.exports = function () {
  var env = process.env.IONIC_ENV === 'prod' ? 'environment.prod.ts' : 'environment.ts';
  useDefaultConfig[process.env.IONIC_ENV].resolve.alias = {
    '@app/environment': path.resolve(__dirname, './src/environments/', env)
  };
  return useDefaultConfig;
}