const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.redirect('/login');
})

router.get('/login', async (req, res) => {
    res.render('login');
})


router.get('/chat', async (req, res) => {
    if (!req.session.username) {
        res.redirect('/login');
    }
    else {
        res.render('chat', { username: req.session.username,avatar:req.session.avatar });
    }
})


router.post('/chat', async (req, res) => {
    req.session.username = req.body.username;
    req.session.avatar =  req.body.avatar
    
    res.redirect('/chat');
})

module.exports.router = router;