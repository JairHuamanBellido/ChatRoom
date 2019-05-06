const express = require('express');
const router = express.Router();

router.get('/',  (req, res) => {
    res.redirect('/login');
})

router.get('/login',  (req, res) => {
    res.render('login');
})


router.get('/chat',  (req, res) => {
    if (!req.session.username) {
        res.redirect('/login');
    }
    else {
        res.render('chat', { username: req.session.username,avatar:req.session.avatar });
    }
})


router.post('/chat',  (req, res) => {
    req.session.username = req.body.username;
    req.session.avatar =  req.body.avatar

    res.redirect('/chat');
})

router.post('/logout', (req,res)=>{
    req.session.username = null || undefined;
    req.session.avatar = null || undefined;
    res.redirect('/login');
})

module.exports.router = router;