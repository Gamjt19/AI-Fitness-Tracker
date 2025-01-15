const express = require('express');
const bodyparser = require('body-parser');
const openaiRoutes = require('./controllers/openai')


const app = express();

app.use(bodyparser.json());
app.use(express.static("public"));

app.use('/api/fitness',openaiRoutes);

app.listen(8080,() =>console.log("server started"))