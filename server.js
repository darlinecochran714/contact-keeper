// starting our express server 
const express = require('express');
// bringing in the DB
const connectDB = require('./config/db')

// connecting database
connectDB();

// initializing express in a variable called 'app
const app = express();

// init middlewear
app.use(express.json({ extended: false }))

// as of now, when running a get request on our server, it'll send back a 'api test'
app.get('/', (req, res) => res.json({msg: 'api test'}))

// defining routes
app.use('/api/users/', require('./routes/users'))
app.use('/api/auth/', require('./routes/auth'))
app.use('/api/contacts/', require('./routes/contacts'))

// putting out port in our env file or port 5000
const PORT = process.env.PORT || 5000;

// express is listening on variable 'PORT'
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

// to start up the back end. type npm run server into the console