const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

// You will need to change the arguments to match your own mongo credientials 
const dbURI = 'mongodb+srv://[username]:[password]@nodeapp.pjqfx.mongodb.net/[clustername]?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }) 
  .then(res => app.listen(3000))
  .catch( err => console.log(err));

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews'); //if you want to change folder name

app.use(express.static('public')); 
app.use(express.urlencoded({extended: true})); // allows us to use req.body in app.post()
app.use(morgan('dev')); // give us feedback in the command line

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use('/blogs',blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
