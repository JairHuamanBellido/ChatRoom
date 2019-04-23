const express = require('express');
const app =  require('express')();
const PORT = process.env.PORT || 3000;
const router =  require('./src/Router/router');
const path = require('path')


app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'views')));


app.set('view engine','ejs');
app.use('/',router.router);

app.listen(PORT);
