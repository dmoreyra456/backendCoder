const express = require('express');
const app = express();
const cartRoutes = require('./src/routes/carts');
const prodRoutes = require('./src/routes/products');

app.use(express.json());

app.use('/carrito', cartRoutes);
app.use('/products', prodRoutes);


const port = 8080;

app.listen(port, function () {
    console.log('La aplicación está corriendo en el puerto ' + port);
});
