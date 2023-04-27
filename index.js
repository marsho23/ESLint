const express = require('express');

const app = express();
require('./db');


// Will always run
// app.use(logger);

const catRoutes = require('./routes/cats');
// Handling the response parsing request to json // Recieves a JS string and convert to java object
app.use(express.json());

app.use('/cats', catRoutes);

app.use((err, req, res) => {
  res.status(err.status).send(err.msg);
});

const server = app.listen(4494, () => {
  console.log(
    `Server started succesfully on port number${server.address().port}`,
  );
});

module.exports = server;
