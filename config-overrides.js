// config-overrides.js - override the webpack config
module.exports = function override(config, env) {
    // Change the target to electron-renderer
    config.target = "electron-renderer";
    return config;
  };
  