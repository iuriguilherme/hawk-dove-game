require("dotenv").config();

module.exports = {
  PORT_FXSTUDIO: 33301,
  PORT_PROJECT: 33300,
  //~ HOST: 'local-ipv4',
  HOST: '127.0.0.1',
  RUN_PROJECT: true,
  ...process.env,
};
