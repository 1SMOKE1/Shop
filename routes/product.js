const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const passport = require('passport');
const upload = require('../upload');

router.get('/', async (req, res) => {
  try{
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (e) {
    res.status(500).json(e);
  }
  
  
})

router.get('/:id', async (req, res) => {
  try{
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch(e) {
    res.status(500).json(e);
  }
  
})

router.post(
  '/',
  passport.authenticate('jwt', {session: false }),
  upload.single('image'),
  async (req, res) => {


  try{
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      imageSrc: req.file ? req.file.path : ''
    });

    await product.save();


    res.status(201).json(product)
    
  } catch (e) {

  }
  
})

router.put(
  '/:id',
  passport.authenticate('jwt', {session: false }),
  upload.single('image'),
  async (req, res) => {


  const {name, price, category, imageSrc, description} = req.body;

  const update = { name, price, category, imageSrc, description};
  if(req.file) {
    update.imageSrc = req.file.path;
  }
  try{
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      update
    );

    res.status(200).json(product);
  } catch (e) {
    res.status(500).json(e);
  }
})


router.delete('/:id', passport.authenticate('jwt', {session: false }), async (req, res) => {
  try {
    const product = await Product.deleteOne(
      {_id: req.params.id}
    )

    res.status(200).json(product);
  } catch (e) {
    res.status(500).json(e);
  }
})

module.exports = router;
