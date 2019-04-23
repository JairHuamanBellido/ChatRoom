const express = require('express');
const router =  express.Router();

router.get('/', async(req,res)=>{
    res.redirect('/login');
})

router.get('/login', async(req,res)=>{
    res.render('login');
})


router.get('/chat', async(req,res)=>{
    res.send('Esta en el chat');
})


router.post('/chat', async(req,res)=>{
    res.redirect('/chat');
})

module.exports.router =  router;