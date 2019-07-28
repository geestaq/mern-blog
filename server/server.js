const express = require('express');
const cors = require('cors');
const config = require('./config');
// import routes
const postRoutes = require('./routes/post.routes');

const app = express();

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', postRoutes);

//run server
app.listen(config.PORT, function(){
  console.log('Server is running on port:', config.PORT);
});
