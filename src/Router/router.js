const express = require('express');
const router =  express.Router();

router.get('/login', async(req,res)=>{
    res.send('Esta en el login')
})

router.get('/chat', async(req,res)=>{
    res.send('Esta en el chat');
})


module.exports.router =  router;