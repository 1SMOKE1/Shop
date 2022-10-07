const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const passport = require('passport');

router.get('/', async (req, res) => {
  try{
    const orders = await Order.find({})

    res.status(200).json(orders);
  } catch(e){
    res.status(500).json(e);
  }
  
})

router.get('/:id',  async (req, res) => {
  try{
    const order = await Order.findById(req.params.id)

    res.status(200).json(order);
  } catch(e){
    res.status(500).json(e);
  }
})

router.post('/', async (req, res) => {
  try{
    const {name, phone, address, cardLines, totalCost, shiped} = req.body;


    const newOrder = new Order({
      name,
      phone,
      address,
      cardLines,
      totalCost,
      shiped  
    })

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch(e){
    res.status(500).json(e);
  }
})

router.put('/:id', async (req, res) => {

  const {name, phone, address, cardLines, shiped, totalCost} = req.body;

  update = {name, phone, address, cardLines, shiped, totalCost}
  try{
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      update
    );

    res.status(200).json(updateOrder)
  } catch (e) {
    res.status(500).json(e);
  }
})


router.delete('/:id', async (req, res) => {
  try{
    const order = await Order.deleteOne(
      {_id: req.params.id}
    )
    res.status(200).json(order);
  } catch (e){
    res.status(500).json(e);
  }
})

module.exports = router;
