const express = require('express');
const router = express.Router();
const CartManager = require('../models/CartManager');

const cartManager = new CartManager('./src/carrito.json');

router.post('/', async (req, res) => {
    try {
        const nuevoCarrito = req.body;
        await cartManager.crearCarrito(nuevoCarrito);
        res.json({ message: 'Carrito creado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const carritoId = req.params.cid;
        const productosEnCarrito = await cartManager.listarProductosEnCarrito(carritoId);
        res.json(productosEnCarrito);
    } catch (error) {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const carritoId = req.params.cid;
        const productoId = req.params.pid;
        const cantidad = req.body.quantity || 1;
        await cartManager.agregarProductoACarrito(carritoId, productoId, cantidad);
        res.json({ message: 'Producto agregado al carrito exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const productoId = req.params.pid;
        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:pid', async (req, res) => {    
    try {
        const productoId = req.params.pid;
        
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
