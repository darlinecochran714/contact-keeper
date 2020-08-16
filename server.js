// starting our express server 
const express = require('express');

// initializing express in a variable called 'app
const app = express();

// as of now, when running a get request on our server, it'll send back a 'whats up'
app.get('/', (req, res) => res.json({msg: 'api test'}))

// putting out port in our env file or port 5000
const PORT = process.env.PORT || 5000;

// express is listening on variable 'PORT'
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

// to start up the back end. type npm run server into the console