const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h1>Hello from this NodeJS app!!!!</h1>
    <h2>This is a better change</h2>
    <p>Try sending a request to <a target="_self" href="/error">/error</a> and see what happens</p>
  `);
});

app.get('/error', (req, res) => {
  process.exit(1);
});

app.listen(8080);
