const mongoose = require('mongoose');
//const Product = require('./models/Product'); // Asume que tienes un modelo Product definido en './models/Product'

// Se asocia un schema
const productSchema = new mongoose.Schema({
  id: Number,
  titulo: String,
  descripcion: String,
  precio: Number,
  imagen: String,
  codigo: String,
  stock: Number
}, { versionKey: false }) // Se agrega porque si no te agrega un campo de versión en cada registro.

const Product = mongoose.model('productos', productSchema);

class ProductDao {
  constructor() {
       this.connectionUri ='mongodb+srv://daniel:dani123@eridocruzmerchaidising.tfiw2hu.mongodb.net/eridomerch';
}

  async connect() {
    try {
      await mongoose.connect(this.connectionUri);
      console.log('Conectado a la base de datos');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('Desconectado de la base de datos');
    } catch (error) {
      console.error('Error al desconectar de la base de datos:', error);
      throw error;
    }
  }

  async createProduct(productData) {
    try {
      await this.connect();
      // Valida si existe el producto antes de crearlo
      let exists = await Product.exists({ "id": productData.id });
      if (exists) {
        throw new Error("El producto ya existe");
      } else {
        // Crea el producto
        let newProduct = new Product(productData);
        await newProduct.save();
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw error;
    } finally {
      this.disconnect();
    }
  }

  async getProducts() {
    try {
      await this.connect();
      return await Product.find();
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error; // Reenvía el error para manejarlo en otro lugar
    } finally {
      this.disconnect();
    }
  }

  async getProductById(productId) {
    try {
      await this.connect();
      const product = await Product.findOne({ "id": productId });
      return product;
    } catch (error) {
      console.error('Error al obtener el producto por ID:', error);
      throw error;
    } finally {
      this.disconnect();
    }
  }

  async updateProduct(productId, updateData) {
    try {
      // Se busca primero el objeto
      let productoActualizado = await this.getProductById(productId);
      if (productoActualizado) {
        productoActualizado.titulo = updateData.titulo;
        productoActualizado.descripcion = updateData.descripcion;
        productoActualizado.precio = updateData.precio;
        productoActualizado.imagen = updateData.imagen;
        productoActualizado.codigo = updateData.codigo;
        productoActualizado.stock = updateData.stock;
        // Se actualiza el objeto
        await this.connect();
        await Product.updateOne({ "_id": productoActualizado._id }, productoActualizado);
      } else {
        throw new Error("Producto no encontrado.");
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw error;
    } finally {
      this.disconnect();
    }
  }

  async deleteProduct(productId) {
    try {
      await this.connect();
      let exists = await Product.exists({ "id": productId });
      if (!exists) {
        throw new Error("El producto no existe");
      } else {
        // Crea el producto
        await Product.deleteOne({ "id": productId })
        console.log('Producto eliminado exitosamente');
      }
      // await Product.findByIdAndDelete({ "id": productId });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw error;
    } finally {
      this.disconnect();
    }
  }

}

module.exports = ProductDao;
