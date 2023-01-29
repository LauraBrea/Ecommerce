import cartSchema from "../dao/models/carts.model.js";
import productManager from '../services/products.service.js';

class CartManager {

    //Create cart
    async createCart(data) {
        try {
            const newCart = await cartSchema.create(data);
            return newCart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Get carts 
    async getCarts() {
        try {
            const carts = await cartSchema.find({ deletedAt: { $exists: false } });
            return carts;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    // Get cart ID
    async getCart(cid) {
        try {
            const cart = await cartSchema.findById(cid).lean();
            return cart;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    // Delete cart ID
    async deleteCart(cid) {
        try {
            await cartSchema.findByIdAndDelete(cid).lean();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Add product to cart
    async addToCart(cid, pid, qty) {
        try {
            const cart = await cartSchema.findById(cid); 
            const product = await productManager.getProduct(pid); // get product from db
          
            if (cart && product) {    // Product and cart exist
                let productIndex = cart.products.findIndex(prod => prod.pid === pid);

                if (productIndex != -1) { // product is in cart?
                    cart.products[productIndex].qty = cart.products[productIndex].qty + qty;
                    cart.products[productIndex].total = cart.products[productIndex].qty * product.price;
                    cart.priceTotal = cart.products.map(prod => prod.total).reduce((acc, curr) => acc + curr);
                } else {
                    cart.products.push({
                        title:product.title,
                        qty: qty,
                        price: product.price,
                        total: Number(product.price * qty).toFixed(2)
                    });
                    cart.priceTotal = cart.products.map(prod => prod.total).reduce((acc, curr) => acc + curr);
                }
                return await cart.save(); 
                
            } else if (product && !cart) { // Product exist but cart does not exist                 
                const cartData = {
                    products: [{
                        title:product.title,
                        qty: qty,
                        price: product.price,
                        total: parseInt(product.price * qty),
                    }],
                    priceTotal: Number(product.price * qty).toFixed(2)
                }
                return await cartSchema.create(cartData);
            }
            return null

        } catch (error) {
            throw new Error(error.message);
        }
    } 

    // Delete product from cart 
    async deleteFromCart(cid, pid) {
        try { 
            const cart = await cartSchema.findById(cid);
            const product = await productManager.getProduct(pid);

            if (cart && product) { // If product and cart exist

                let productIndex = cart.products.findIndex(prod => prod.pid === pid);
                if (productIndex != -1) { 
                    cart.products.splice(productIndex, 1);
                    cart.priceTotal = cart.products.map(prod => prod.total).reduce((acc, curr) => acc + curr);
                }
            }
            return await cart.save();

        } catch (error) {
            throw new Error(error.message);
        }
    }
}

const cartManager = new CartManager();

export default cartManager;

