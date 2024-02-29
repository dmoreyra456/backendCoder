const fs = require('fs').promises;

let contadorId = 0;

function generarId() {
    contadorId++;
    return contadorId;
}

class ProductManager {
    constructor(path) {
        this.path = path;
        this.productos = [];
    }

    async agregarProducto(producto) {
        const camposRequeridos = ['titulo', 'descripcion', 'precio', 'imagen', 'codigo', 'stock'];
        for (const campo of camposRequeridos) {
            if (!producto[campo]) {
                throw new Error(`El producto necesita un ${campo}`);
            }
        }

        let productoExistente = this.productos.find(p => p.codigo === producto.codigo);
        if (productoExistente) {
            throw new Error("El código del producto ya existe");
        }
        producto.id = generarId();
        this.productos.push(producto);
        await this.guardarProductos();
    }

    async obtenerProductos() {
        try {
            const contenidoArchivo = await fs.readFile('./src/productos.json', 'utf-8');
            console.log('Contenido del archivo:', contenidoArchivo);
            this.productos = JSON.parse(contenidoArchivo);
            return this.productos;
        } catch (error) {
            console.error('Error al leer el archivo:', error);
            throw error;
        }
    }

    obtenerProductoPorId(id) {
        let producto = this.productos.find(p => p.id === id);
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
