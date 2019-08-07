const express = require('express');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');
const helmet = require('helmet');
const loadTestData = require('./testData');
// import routes
const postRoutes = require('./routes/post.routes');

const app = express();

//middleware
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  sanitize(req.body);
  next();
});
app.use('/api', postRoutes);

// connects our back end code with the database
mongoose.connect(config.DB, { useNewUrlParser: true });
let db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
  loadTestData();
});
db.on('error', (err) => console.log('Error ' + err));

//run server
app.listen(config.PORT, function(){
  console.log('Server is running on port:', config.PORT);
});
