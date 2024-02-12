let contadorId = 0;

function generarId() {
    contadorId++;
    return contadorId;
}

class AdministradorDeProductos {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        if (!producto.titulo) {
            throw new Error("El producto necesita un título");
        }
        if (!producto.descripcion) {
            throw new Error("El producto necesita una descripción");
        }
        if (!producto.precio) {
            throw new Error("El producto necesita un precio");
        }
        if (!producto.imagen) {
            throw new Error("El producto necesita una imagen");
        }
        if (!producto.codigo) {
            throw new Error("El producto necesita un código");
        }
        if (!producto.stock) {
            throw new Error("El producto necesita un stock");
        }
        
        let productoExistente = this.productos.find(p => p.codigo === producto.codigo);
        if (productoExistente) {
            throw new Error("El código del producto ya existe");
        }
        producto.id = generarId();
        this.productos.push(producto);
    }

    obtenerProductos() {
        return this.productos;
    }

    obtenerProductoPorId(id) {
        let producto = this.productos.find(p => p.id === id);
        if (producto) {
            return producto;
        } else {
            console.error("Producto no encontrado");
            return null;
        }
    }
}

let administrador = new AdministradorDeProductos();
console.log(administrador.obtenerProductos());

let producto1 = {
    titulo: "producto de prueba",
    descripcion: "Este es un producto de prueba",
    precio: 200,
    imagen: "Sin imagen",
    codigo: "1812",
    stock: 25
};
administrador.agregarProducto(producto1);
console.log(administrador.obtenerProductos());

let producto2 = {
    titulo: "segundo producto",
    descripcion: "Este es un segundo producto",
    precio: 300,
    imagen: "Sin imagen",
    codigo: "666",
    stock: 30
};
administrador.agregarProducto(producto2);
console.log(administrador.obtenerProductos());

