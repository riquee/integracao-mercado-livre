const express = require('express');
const app = express();
const meli = require('mercadolibre-nodejs-sdk');
require('dotenv/config');
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', express.static(`${__dirname}/public`));

app.get('/callback', async (req, res) => {
  const { code } = req.query;

  const apiInstance = new meli.OAuth20Api();
  const opts = {
    grantType: 'authorization_code',
    clientId: "1059990109617356",
    clientSecret: "skfUMB58aIeRlKTSkFM234SkK6wXclTc",
    redirectUri: "https://integracao-mercado-livre.herokuapp.com/callback",
    code,
    refreshToken: "https://integracao-mercado-livre.herokuapp.com/callback",
  };
  apiInstance.getToken(opts, (error, data, response) => {
    if (error) {
      return res.status(200).send(error);
    } else {
      const [accessToken] = response.text.match(/(APP_USR-)(\w+-){3}\d+/);
      return res.status(200).send({ token: accessToken, code });
    }
  });
});

app.listen(PORT, () => console.log(`CONNECT PORT: ${PORT}`));
