const express = require('express');
const path = require('path');
const WebSocket = require('ws');

const app = express();

const wss = new WebSocket.Server({ port: 8989 })

const users = [];

const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data))
    }
  })
}

wss.on('connection', (ws) => {
  let index;
  ws.on('message', message => {
    const data = JSON.parse(message);
    switch(data.type) {
      case 'ADD_USER': {
        index = users.length + 1;
        users.push({ name: data.name, id: index })
        ws.send(JSON.stringify({ type: 'USERS_LIST', users }))
        broadcast({ type: 'USERS_LIST', users }, ws)
        break;
      }
     case 'ADD_MESSAGE': {
       broadcast({ type: 'ADD_MESSAGE', message: data.message, author: data.author }, ws)
       break;
     }
     default:
       break;
    }
  })
  ws.on('close', () => {
    // remove the current user from the users list
    users.splice(index, 1)
    broadcast({ type: 'USERS_LIST', users }, ws)
  })
})

app.disable('x-powered-by')
.set('port', process.env.PORT || 5000)

.use(express.static(path.join(__dirname, '..', 'client', 'build')))
.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
});

const port = app.get('port');

app.listen(port, () => console.log(`the server started on port ${port}`));
