const fs = require('fs').promises;

class CartManager {
constructor(path) {
    this.path = path;
    this.carritos = [];
}

async crearCarrito(nuevoCarrito) {
}

async listarProductosEnCarrito(carritoId) {
}

async agregarProductoACarrito(carritoId, productoId, cantidad) {
}
}

module.exports = CartManager;
