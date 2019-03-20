'use strict';
const config = require('./config/main');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const router = require('./router.js');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


const { MONGO_USER, MONGO_PASS, MONGO_URL } = process.env;

// CLOUD DB CONNECTION
mongoose
	.connect(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}`)
	.then(() => console.log("connection succesful"))
	.catch(err => console.error(err));

let db = mongoose.connection;

db.on("error", console.error.bind(console, "#MongoDB - connection error"));

router(app);

var server = app.listen(config.port, () => {
  console.log('server is running on port', config.port);
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('user connected');
 
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('room', function(data) {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit('load users and code')
    socket.broadcast.to(data.room).emit('new user join', data.user)
  });

  socket.on('leave room', (data) => {
    socket.broadcast.to(data.room).emit('user left room', {user: data.user})
    socket.leave(data.room)
  });

  socket.on('coding event', function(data) {
    socket.broadcast.to(data.room).emit('receive code', {code: data.code, currentlyTyping: data.currentlyTyping});
  });

  socket.on('send users and code', function(data) {
    socket.broadcast.to(data.room).emit('receive users and code', data)
  })
});

