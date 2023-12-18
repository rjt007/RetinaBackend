const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//Register
router.post('/register', async(req, res)=>{
    try{
        const {name, email, age, password} = req.body;
        if(!email || !password || !name || !age){
            return res.status(400).json({message: 'Error! All fields are required!'});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            name:name,
            email:email,
            age:age,
            password:hashedPassword
        });
        await user.save();
        return res.status(201).json({message:'User registered successfully.'});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
});

//Login
router.post('/login', async(req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: 'Error! All fields are required!'});
        }
        const user = await User.findOne({email: email}, {__v: 0});
        if(!user){
            return res.status(400).json({message:'Error! Enter a valid email.'});
        }
        else if(!(await bcrypt.compare(password, user.password))){
            return res.status(400).json({message:'Error! Password entered is wrong.'});
        }
        else{
            return res.status(200).json({user});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
});

module.exports = router;