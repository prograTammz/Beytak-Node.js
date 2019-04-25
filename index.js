const express = require("express");
const app = express();

const assets = require('./routes/assets');

app.use(express.json());
app.use('/api/assets', assets);

app.listen(2000, ()=> console.log(`listening on port 2000`));