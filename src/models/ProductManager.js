const fs = require('fs').promises;
const ProductDao = require('../../dao/ProductDao');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.productos = [];
        this.productDao = new ProductDao();
    }

    async agregarProducto(producto) {
        await this.productDao.createProduct(producto);
    }

    async obtenerProductos() {

        return await this.productDao.getProducts();
    }

    async obtenerProductoPorId(id) {
        // Lógica para obtener un producto por su id
        return await this.productDao.getProductById(id);
    }

    async actualizarProducto(id, productoActualizado) {
       await this.productDao.updateProduct(id,productoActualizado);
    }

    async eliminarProducto(id) {
        await this.productDao.deleteProduct(id);
    }

    async guardarProductos() {
        await fs.writeFile(this.path, JSON.stringify(this.productos));
    }

    async guardarProducto(producto) {

    }
}

module.exports = ProductManager;
