const rewireStyledComponents = require('react-app-rewire-styled-components')

module.exports = (config, env) => {
  //do stuff with the webpack config...
  config = rewireStyledComponents(config, env)
  return config
}