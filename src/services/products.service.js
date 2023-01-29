import ProductSchema from '../dao/models/products.model.js';

class ProductManager {
    
    // Create product
    async createProduct(data) {
        try {
            const newProduct = await ProductSchema.create(data);
            return newProduct;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // Get products
    async getProducts(query) {
        try {
            const limit = query? Number(query) : 0;
            const products = await ProductSchema.find({deleted: { $exists: false }}).limit(limit).lean();
            return products;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // Get product ID
    async getProduct(pid) {
        try {
            const product = await ProductSchema.findById(pid).lean();
            return product;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // Update product ID
    async updateProduct(pid, data) {
        try {
            const updatedProduct = await ProductSchema.findByIdAndUpdate(pid, data, {new: true}).lean();
            return updatedProduct;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // Delete product ID
    async deleteProduct(pid) {
        try {
            await ProductSchema.deleteById(pid);
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

const productManager = new ProductManager();

export default productManager;