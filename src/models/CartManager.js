const fs = require('fs').promises;

const ProductManager = require('./ProductManager');

class CartManager {
    constructor(path) {
        this.path = path;
        this.carritos = [];
        this.adminProductos = new ProductManager('./src/productos.json');
    }

    async crearCarrito(newCarrito) {
        try {
            let ultimoId = this.carritos.reduce((maxId, objeto) => {
                return (objeto.id > maxId) ? objeto.id : maxId;
            }, 0);
            console.log(ultimoId);
            let nuevoId = ultimoId + 1;

            let nuevoCarrito = {
                id: nuevoId,
                productos: newCarrito.productos
            };

            this.carritos.push(nuevoCarrito);
            await this.guardarCarritos();
        } catch (error) {
            throw new Error('Error al crear el carrito');
        }
    }

    async listarProductosEnCarrito(carritoId) {
        try {
            const carrito = this.carritos.find(c => c.id === carritoId);
            if (carrito) {
                return carrito.productos;
            } else {
                throw new Error("Carrito no encontrado");
            }
        } catch (error) {
            throw new Error('Error al listar productos en el carrito');
        }
    }

    async agregarProductoACarrito(carritoId, productoId, cantidad) {
        this.obtenerCarritos();
        const carritoIndex = this.carritos.findIndex(c => c.id === carritoId);
        console.log(`CarritoIndex: ${carritoIndex}`)
        let productoEncontrado = this.adminProductos.obtenerProductoPorId(productoId);
        if (!productoEncontrado) {
            throw new Error("El producto no existe.");
        }
        if (carritoIndex !== -1) {
            const productoIndex = this.carritos[carritoIndex].productos.findIndex(p => p.id === productoId);

            if (productoIndex !== -1) {
                this.carritos[carritoIndex].productos[productoIndex].cantidad += cantidad;
            } else {
                this.carritos[carritoIndex].productos.push(productoEncontrado);
            }
            await this.guardarCarritos();
        } else {
            throw new Error("Carrito no encontrado");
        }
    }

    async obtenerCarritos() {
        // Lógica para obtener todos los productos
        this.carritos = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        return this.carritos;
    }


    async guardarCarritos() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carritos));
        } catch (error) {
            throw new Error('Error al guardar los carritos');
        }
    }
}

module.exports = CartManager;
