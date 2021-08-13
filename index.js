const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Está vivo!!!'));
app.listen(port, () => console.log(`Ouvind  o na porta ${port}`));