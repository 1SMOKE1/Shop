const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const candidate = await User.findOne({
    email: req.body.email
  });

  if(candidate){
    res.status(409).json('this User has been in system yet')
  } else {
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt)
    })
  
    await user.save();
  
    res.status(201).json(user)
  }
})

router.post('/login', async (req, res) => {
  try{
    const user = await User.findOne({email: req.body.email});
    if(user){
      const passwordResult = bcrypt.compareSync(req.body.password, user.password);
      if(passwordResult){
        const token = jwt.sign({
          email: user.email,
          id: user._id,
        }, 'secret', {expiresIn: 10 * 60});
        res.status(200).json({
          token: `Bearer ${token}`,
          session: 10 * 60,
        })
      } else {
        res.status(401).json('Wrong password')
      }
    } else {
      res.status(404).json('Wrong email') 
    }
    
  } catch (e) {
    res.status(500).json('Internal server error')
  }
  
  
})

module.exports = router;