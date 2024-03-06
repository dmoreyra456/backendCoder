const fs = require('fs').promises;

class ProductManager {
constructor(path) {
    this.path = path;
    this.productos = [];
}

async agregarProducto(producto) {
    // Lógica para agregar un producto
    this.productos.push(producto);
    await this.guardarProductos();
}

async obtenerProductos() {
    // Lógica para obtener todos los productos
    this.productos = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    return this.productos;
}

async obtenerProductoPorId(id) {
    // Lógica para obtener un producto por su id
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
    return producto;
    } else {
    throw new Error("Producto no encontrado");
    }
}

async guardarProductos() {
    await fs.writeFile(this.path, JSON.stringify(this.productos));
}
}

module.exports = ProductManager;
