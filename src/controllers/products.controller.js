import productManager from '../services/products.service.js';
import { STATUS } from "../constants/constants.js";

// Get products
export async function getProducts(req, res) {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(limit);

        if (!isNaN(limit)) {
            res.status(200).json({
                success: true,
                data: products
            });
        } else if (limit) {
            res.status(400).json({
                success: false,
                message: "Invalid limit"
            });
        } else {
            res.status(200).json({
                success: true,
                data: products
            });
        };
    } catch (error) {
        res.status(400).json({
          error: error.message,
          status: STATUS.FAIL,
        });
    }
}

// Get product ID
export async function getProduct(req, res) {
    try {
        const { pid } = req.params;
        const product = await productManager.getProduct(pid);

        if (product) {
            res.status(200).json({
                success: true,
                data: product
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
    } catch (error) {
        res.status(400).json({
          error: error.message,
          status: STATUS.FAIL,
        });
    }
}
  
// Create product
export async function createProduct(req, res) {
    try {
        const product = req.body;
        const newProduct = await productManager.createProduct(product);
        
        res.status(201).json({
            success: true,
            message: "New product created",
            data: newProduct
        });
    } catch (error) {
        res.status(400).json({
          error: error.message,
          status: STATUS.FAIL,
        });
    }
}

// Update product ID
export async function updateProduct(req, res) {
    try {
        const { pid } = req.params;
        const product = req.body;
        const updatedProduct = await productManager.updateProduct(pid, product);
        res.status(200).json({
            success: true,
            message: "Product updated",
            data: updatedProduct
        });
    } catch (error) {
        res.status(400).json({
          error: error.message,
          status: STATUS.FAIL,
        });
    }
}

// Delete product ID
export async function deleteProduct(req, res) {
    try {
        const { pid } = req.params;
        await productManager.deleteProduct(pid);
        res.status(200).json({
            success: true,
            message: "Product deleted",
        });
    } catch (error) {
        res.status(400).json({
          error: error.message,
          status: STATUS.FAIL,
        });
    }
}





