const express  = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

//Register User
// POST /api/register
router.post('/register', async(req,res)=>{
  const {name, email, password} = req.body;
  try{
    //check existing user
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword =  await bcrypt.hash(password,10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    })

    await user.save();

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.status(201).json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email } // Exclude password
    });

  } catch(error){
    console.error(error); 
    res.status(500).json({message: 'Server error'});
  }
})

router.post('/login', async(req,res)=>{
  const {email, password} = req.body;

  try{
    const user = await User.findOne({email});
    
    //check user exists
    if(!user){
      return res.status(400).json({message: 'Invalid credentials'});
    }

    //password checking
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({message: 'Invalid credentials' });
    }

    //create a json web token
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.status(200).json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email } // Exclude password
    });


  } catch(error){
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }

})

module.exports = router;
