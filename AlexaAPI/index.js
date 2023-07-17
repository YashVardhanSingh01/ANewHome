const express = require('express');
require('./config/db'); 
const app = express();
//const cors = require('cors');
const routes = require('./api/routes/audioRoutes');
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());


routes(app);

module.exports = app;
// app.listen(port, ()=>{
//     console.log(`Listening on port ${port}`);
// })