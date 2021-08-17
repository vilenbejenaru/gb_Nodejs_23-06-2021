const io = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((request, response) => {
    const indexPath = path.join(__dirname, "index.html");
    const readStream = fs.createReadStream(indexPath);
    readStream.pipe(response);
});

const socket = io(server);
let usersList = [];

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
socket.on('connection', client => {
    console.log('Client ID: ' + client.id);
    client.broadcast.emit('NEW_CLIENT_CONNECTED');

    client.on('NewPlayer', data => {
        let user = {
            name: '',
            color: '',
            id: ''
        }
        user.name = data;
        user.color = getRandomColor();
        user.id = client.id;
        usersList.push(user);
    console.log('New client connected ' + data);
    console.log(usersList);
    })
    client.on('disconnect', data => {
        console.log('Client  disconnected');
    })
    client.on('CLIENT_MSG', data => {
        const payload = {
            message: data.message.split('').reverse().join('')
        };
        client.emit('SERVER_MSG', payload)
        client.broadcast.emit('SERVER_MSG', payload);
    });
});


server.listen(3000);
