const express = require('express');
const router = express.Router();
const ProductManager = require('../models/ProductManager');

const administrador = new ProductManager('./src/productos.json');

// Obtener productos
router.get('', async function (req, res) {
    try {
        let productos = await administrador.obtenerProductos();
        if (req.query.limit) {
            productos = productos.slice(0, req.query.limit);
        }
        res.send(productos);
    } catch (error) {
        console.log(error)
        let message = error ? error.message : 'Error al obtener productos';
        res.status(500).send({ error: message });
    }
});

// Obtener un producto
router.get('/:pid', async function (req, res) {
    try {
        const id = parseInt(req.params.pid);
        const producto = await administrador.obtenerProductoPorId(id);
        res.send(producto);
    } catch (error) {
        console.log(error)
        res.status(404).send({ error: 'Producto no encontrado' });
    }
});

// Crear un nuevo producto
router.post('', async function (req, res) {
    try {
        await administrador.agregarProducto(req.body);
        res.status(201).send({ mensaje: 'Producto agregado correctamente.' });
    } catch (error) {
        console.log(error)
        let message = error ? error.message : 'Error al guardar el nuevo producto';
        res.status(500).send({ error: message });
    }
})

// Actualizar un producto
router.put('/:pid', async function (req, res) {
    try {
        const id = parseInt(req.params.pid);
        await administrador.actualizarProducto(id, req.body);
        res.status(201).send({ mensaje: 'Producto actualizado correctamente.' });
    } catch (error) {
        console.log(error)
        let message = error ? error.message : 'Error al actualizar el nuevo producto';
        res.status(500).send({ error: message });
    }
})

// Borrar un producto por id
router.delete('/:pid', async function (req, res) {
    try {
        const id = parseInt(req.params.pid);
        await administrador.eliminarProducto(id);
        res.status(201).send({ mensaje: 'Producto eliminado correctamente.' });
    } catch (error) {
        console.log(error)
        let message = error ? error.message : 'Error al eliminar el producto.';
        res.status(500).send({ error: message });
    }
})

module.exports = router;
