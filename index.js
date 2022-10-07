const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

const passport = require('passport');
const passportJwt = require('./passport-jwt');

const app = express();

const PORT = process.env.PORT || 4000

app.use(passport.initialize());
passportJwt(passport)


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb+srv://kamyshan19:kamyshan19@dbproject.3rpy3ne.mongodb.net/?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}, function (err){
  if(err){
    console.log(err);
    return ;
  }

  console.log('mongodb connected');
  
  app.listen(PORT, () => {
    console.log('Server listen on ' + PORT)
  })
})


app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

if(process.env.PORT === 'production'){
  app.use(express.static('client/client/dist'))

  app.get('*', (req, res) => {
    res.sendFile(
      path.ressolve(
        __dirname, 'client', 'dist', 'client', 'index.html'
      )
    )
  })
}


