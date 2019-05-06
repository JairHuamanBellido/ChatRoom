const express = require('express');
const app = express();
const session = require('express-session')
const server = require('http').Server(app);
const PORT = process.env.PORT || 3000;
const router = require('./src/Router/router');
const path = require('path')
const io = require('socket.io')(server);

const allUser = require('./src/db/allUser');



const colors = ["#f34e4e","#4e8df3", "#c54ef3","#51a7a4","#52bf57","#02a73f"]


console.log( Math.ceil(Math.random()*1 +5));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/public', express.static('public'));
app.set('view engine', 'ejs');


app.use('/', router.router);

io.on('connection', (socket) => {
    socket.on('send message', (data) => {
        io.sockets.emit('display message', { message: data.message, username: data.username, avatar: data.avatar, id:socket.id })

    })

    socket.on('I am in room', (data) => {

        allUser.allUser.push({ id: socket.id, username: data.username, avatar: data.avatar });

        let userConected = allUser.allUser.filter(user => user.id != socket.id);
        socket.broadcast.emit('New member', { username: data.username, id: socket.id, avatar: data.avatar });
        socket.emit('set All Data', { allUser: userConected, id:socket.id });


    })

    socket.on('disconnect', (data) => {
        allUser.allUser = allUser.allUser.filter(user => user.id != socket.id)

        socket.broadcast.emit('someone left', { username: socket.id })
    });
    

})

server.listen(PORT);
