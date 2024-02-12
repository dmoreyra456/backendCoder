let idCounter = 0;

function generateId() {
    idCounter += 1;
    return idCounter;
}

class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        if (!product.title) {
            throw new Error("El producto debe tener un título");
        }
        if (!product.description) {
            throw new Error("El producto debe tener una descripción");
        }
        if (!product.price) {
            throw new Error("El producto debe tener un precio");
        }
        if (!product.thumbnail) {
            throw new Error("El producto debe tener una imagen");
        }
        if (!product.code) {
            throw new Error("El producto debe tener un código");
        }
        if (!product.stock) {
            throw new Error("El producto debe tener un stock");
        }
        
        let existingProduct = this.products.find(p => p.code === product.code);
        if (existingProduct) {
            throw new Error("El código del producto está repetido");
        }
        product.id = generateId();
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        let product = this.products.find(p => p.id === id);
        if (product) {
            return product;
        } else {
            console.error("producto no encontrado");
            return null;
        }
    }
}

let productManager = new ProductManager();
console.log(productManager.getProducts());

let nuevoProducto = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "1812",
    stock: 25
};
productManager.addProduct(nuevoProducto);
console.log(productManager.getProducts());

let segundoProducto = {
    title: "segundo producto",
    description: "Este es un segundo producto",
    price: 300,
    thumbnail: "Sin imagen",
    code: "666",
    stock: 30
};
productManager.addProduct(segundoProducto);
console.log(productManager.getProducts());
