const fs = require('fs');

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

    agregarProducto(producto) {
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
        this.guardarProductos();
    }

    obtenerProductos() {
        this.productos = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        return this.productos;
    }

    obtenerProductoPorId(id) {
        let producto = this.productos.find(p => p.id === id);
        if (producto) {
            return producto;
        } else {
            throw new Error("Producto no encontrado");
        }
    }

    actualizarProducto(id, nuevoProducto) {
        let indice = this.productos.findIndex(p => p.id === id);
        if (indice === -1) {
            throw new Error("Producto no encontrado");
        }
        this.productos[indice] = {...this.productos[indice], ...nuevoProducto};
        this.guardarProductos();
    }

    eliminarProducto(id) {
        let indice = this.productos.findIndex(p => p.id === id);
        if (indice === -1) {
            throw new Error("Producto no encontrado");
        }
        this.productos.splice(indice, 1);
        this.guardarProductos();
    }

    guardarProductos() {
        fs.writeFileSync(this.path, JSON.stringify(this.productos));
    }
}

let administrador = new ProductManager('./productos.json');

console.log(administrador.obtenerProductos().length === 0);

let producto1 = {
    titulo: "producto prueba",
    descripcion: "Este es un producto prueba",
    precio: 200,
    imagen: "Sin imagen",
    codigo: "abc123",
    stock: 25
};
administrador.agregarProducto(producto1);

console.log(administrador.obtenerProductos().length === 1);

let productoObtenido = administrador.obtenerProductoPorId(1);
console.log(productoObtenido.titulo === "producto prueba");

administrador.actualizarProducto(1, {precio: 300});
productoObtenido = administrador.obtenerProductoPorId(1);
console.log(productoObtenido.precio === 300);

administrador.eliminarProducto(1);
console.log(administrador.obtenerProductos().length === 0);
