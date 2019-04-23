const express = require('express');
const app =  require('express')();
const session = require('express-session')
const http =  require('http').Server(app);
const PORT = process.env.PORT || 3000;
const router =  require('./src/Router/router');
const path = require('path')
const io =  require('socket.io')(http);


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'views')));

app.use('/public', express.static('public'))
app.set('view engine','ejs');
app.use('/',router.router);

io.on('connection', (socket)=>{
    console.log('user and enconnect');
})

http.listen(PORT);
