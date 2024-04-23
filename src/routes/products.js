const express = require('express');
const router = express.Router();
const ProductManager = require('../models/ProductManager');

const administrador = new ProductManager('./src/productos.json');

// Obtener productos con filtros, paginación y ordenamiento
router.get('/', async (req, res) => {
    try {
        let { limit = 10, page = 1, sort, query } = req.query;
        limit = parseInt(limit);
        page = parseInt(page);

        const skip = (page - 1) * limit;

        let filter = {};
        if (query) {
            filter = { category: query }; // Asumiendo que "category" es el campo por el cual quieres filtrar
        }

        let sortOptions = {};
        if (sort) {
            sortOptions = { price: sort === 'asc' ? 1 : -1 }; // Asumiendo que quieres ordenar por precio
        }

        const totalProducts = await administrador.countProducts(filter);
        const totalPages = Math.ceil(totalProducts / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        const productos = await administrador.obtenerProductos(filter, limit, skip, sortOptions);

        res.render('products', {
            productos,
            totalPages,
            page,
            hasNextPage,
            hasPrevPage,
            prevLink: hasPrevPage ? `/products?page=${page - 1}` : null,
            nextLink: hasNextPage ? `/products?page=${page + 1}` : null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al obtener productos.' });
    }
});

// Obtener un producto por ID
router.get('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const producto = await administrador.obtenerProductoPorId(id);
        
        if (producto) {
            res.send(producto);
        } else {
            res.status(404).send({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al obtener el producto' });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        await administrador.agregarProducto(req.body);
        res.status(201).send({ mensaje: 'Producto agregado correctamente.' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al guardar el nuevo producto' });
    }
});

// Actualizar un producto
router.put('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        await administrador.actualizarProducto(id, req.body);
        res.status(200).send({ mensaje: 'Producto actualizado correctamente.' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al actualizar el producto' });
    }
});

// Borrar un producto por ID
router.delete('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        await administrador.eliminarProducto(id);
        res.status(200).send({ mensaje: 'Producto eliminado correctamente.' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al eliminar el producto' });
    }
});

module.exports = router;

