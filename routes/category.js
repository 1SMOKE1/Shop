const express = require('express');
const passport = require('passport');
const router = express.Router();
const Category = require('../models/category');

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try{
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch(e) {

  }
})

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try{
    const product = Category.findById(req.params.id);

    res.status(200).json(product);
  } catch (e) {

  }
})


router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try{
    console.log(req.body)
    const category = new Category({
      name: req.body.name 
    })

    await category.save();

    res.status(201).json(category);
  } catch (e) {
    console.log(e);
  }
})

router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try{
    console.log(req.params.id)
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {name: req.body.name}
    );

    res.status(200).json(category);
  } catch (e) {
    res.status(500).json(e);
  }
})

router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const product = await Category.deleteOne(
      {_id: req.params.id}
    )

    res.status(200).json(product);
  } catch (e) {
    res.status(500).json(e);
  }
})

module.exports = router;

