const express = require('express');
const app = express();
const session = require('express-session')
const server = require('http').Server(app);
const PORT = process.env.PORT || 3000;
const router = require('./src/Router/router');
const path = require('path')
const io = require('socket.io')(server);


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/public', express.static('public'))
app.set('view engine', 'ejs');


app.use('/', router.router);

io.on('connection', (socket) => {
    socket.on('send message', (data)=>{
        io.sockets.emit('display message',{message:data.message,username:data.username})
        
    })

})

server.listen(PORT);
