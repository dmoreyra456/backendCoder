const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.path = path;
        this.productos = [];
    }

    async agregarProducto(producto) {
        // Lógica para agregar un producto
        let productos = await this.obtenerProductos();
        let productoEncontrado = productos.some(p => p.titulo == producto.titulo);
        if (productoEncontrado) {
            throw new Error('El producto ya existe.');
        }
        let nuevoId = productos.reduce((maxId, objeto) => {
            return (objeto.id > maxId) ? objeto.id : maxId;
        }, 0)
        producto.id = nuevoId + 1;
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

    async actualizarProducto(id, nuevoProducto) {
        let productos = await this.obtenerProductos();
        // Buscar el índice del producto que coincide con el ID proporcionado
        const index = productos.findIndex(p => p.id === id);
        if (index !== -1) {
            // Actualizar el producto existente con los datos del nuevo producto
            productos[index] = {
                ...productos[index], // Mantener los datos existentes
                ...nuevoProducto    // Actualizar con los datos del nuevo producto
            };
            // Guardar la lista actualizada de productos
            await this.guardarProductos();
        } else {
            throw new Error('Producto no encontrado');
        }

    }

    async eliminarProducto(id) {
        let productos = await this.obtenerProductos();
        // Buscar el índice del producto que coincide con el ID proporcionado
        const index = productos.findIndex(p => p.id === id);
        if (index !== -1) {
            // Eliminar el producto encontrado del array de productos
            productos.splice(index, 1);

            // Guardar la lista actualizada de productos
            await this.guardarProductos();
        } else {
            throw new Error('Producto no encontrado');
        }
    }

    async guardarProductos() {
        await fs.writeFile(this.path, JSON.stringify(this.productos));
    }
}

module.exports = ProductManager;
