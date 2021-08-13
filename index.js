const express = require('express');
const app = express();
const meli = require('mercadolibre-nodejs-sdk');
const port = 3000;
require('dotenv/config');

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'ok' });
});

app.get('/callback', async (req, res) => {
  const { code } = req.query;

  const apiInstance = new meli.OAuth20Api();
  const opts = {
    grantType: 'authorization_code',
    clientId: process.env.MELI_CLIENT_ID,
    clientSecret: process.env.MELI_CLIENT_SECRET,
    redirectUri: process.env.MELI_CLIENT_URI,
    code,
    refreshToken: process.env.MELI_CLIENT_URI,
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

app.listen(port, () => console.log(`CONNECT PORT: 3000`));
