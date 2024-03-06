const express = require('express');
const router = express.Router();
const ProductManager = require('../models/ProductManager');

const productManager = new ProductManager('./src/productos.json');

router.get('/', async (req, res) => {
try {
    let productos = await productManager.obtenerProductos();
    if (req.query.limit) {
productos = productos.slice(0, req.query.limit);
    }
    res.json(productos);
} catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
}
});

router.get('/:pid', async (req, res) => {
try {
    const id = parseInt(req.params.pid);
    const producto = await productManager.obtenerProductoPorId(id);
    res.json(producto);
} catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
}
});

router.post('/', async (req, res) => {
try {
    const nuevoProducto = req.body;
    await productManager.agregarProducto(nuevoProducto);
    res.json({ message: 'Producto agregado exitosamente' });
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

router.put('/:pid', async (req, res) => {
try {
    const id = parseInt(req.params.pid);
    const nuevoProducto = req.body;
    await productManager.actualizarProducto(id, nuevoProducto);
    res.json({ message: 'Producto actualizado exitosamente' });
} catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
}
});

router.delete('/:pid', async (req, res) => {
try {
    const id = parseInt(req.params.pid);
    await productManager.eliminarProducto(id);
    res.json({ message: 'Producto eliminado exitosamente' });
} catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
}
});

module.exports = router;
