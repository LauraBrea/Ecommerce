import cartManager from "../services/carts.service.js";
import { STATUS } from "../constants/constants.js";

// Create Cart
export async function createCart(req, res) {
    try {
        const { body } = req;
        const cart = await cartManager.createCart(body);
        res.status(201).json({
            newCart: cart,
            status: STATUS.SUCCESS,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: STATUS.FAIL,
        });
    }
}

// Get Carts
export async function getCarts(req, res) {
    try {
        const carts = await cartManager.getCarts();
        res.json({
            success: true,
            data: carts
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: STATUS.FAIL,
        });
    }
}

// Get Cart ID
export async function getCart(req, res) {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCart(cid);
        res.status(200).json({
            success: true,
            data: cart
        });
    }
    catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

// Delete Cart ID
export async function deleteCart(req, res) {
    try {
        const { cid } = req.params;
        await cartManager.deleteCart(cid);
        res.status(200).json({ 
            success: true,
            message: "Delete cart"
        });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

// Add product to Cart ID
export async function addToCart(req, res) {
    try {
        const { cid, pid, qty } = req.params;
        const cart = await cartManager.addToCart(cid, pid, Number(qty));
        if (cart) {
            res.status(200).json({
                success: true,
                message: "Product added to cart",
                data: cart
            });
        } else {
            res.status(404).json({
                success: false,
                message:"Product not found"
            });
        }
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

// Delete product from Cart ID
export async function deleteFromCart(req, res) {
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.deleteFromCart(cid, pid);
        if (cart) {
            res.status(200).json({
                success: true,
                message: "Deleted product",
                data: cart
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}