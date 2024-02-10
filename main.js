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
    }
    console.error("Not found");
    }
}
