const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
let administrador = new ProductManager('./src/productos.json');

app.get('/', function(req, res) {
    res.send('¡Bienvenido a la aplicación!');
});

app.get('/products', async function(req, res) {
    try {
        let productos = await administrador.obtenerProductos();
        if (req.query.limit) {
            productos = productos.slice(0, req.query.limit);
        }
        res.send(productos);
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener productos' });
    }
});

app.get('/products/:pid', async function(req, res) {
    try {
        const id = parseInt(req.params.pid);
        const producto = await administrador.obtenerProductoPorId(id);
        res.send(producto);
    } catch (error) {
        res.status(404).send({ error: 'Producto no encontrado' });
    }
});

const port = 8080;

app.listen(port, function() {
    console.log('La aplicación está corriendo en el puerto ' + port);
});

module.exports = app;
