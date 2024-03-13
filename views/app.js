const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const productsRouter = require('../src/routes/products');
const cartsRouter = require('../src/routes/carts');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

wss.on('connection', (ws) => {
  console.log('Cliente conectado a través de WebSocket');

  ws.on('message', (message) => {
    console.log(`Mensaje recibido a través de WebSocket: ${message}`);
  });

ws.on('close', () => {
    console.log('Cliente desconectado de WebSocket');
  });
});

const port = 8080;

server.listen(port, () => {
console.log(`Servidor HTTP y WebSocket está corriendo en el puerto ${port}`);
});
