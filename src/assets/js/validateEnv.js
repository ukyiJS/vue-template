const { cleanEnv, str } = require('envalid');

module.exports = () => {
  cleanEnv(process.env, {
    VUE_APP_CRYPTO_SECRET_KEY: str()
  });
};
