require("dotenv").config();

module.exports = {
  PORT_FXSTUDIO: 3304,
  PORT_PROJECT: 3305,
  HOST: 'local-ipv4',
  RUN_PROJECT: true,
  ...process.env,
};
