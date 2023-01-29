import express from "express";
import * as cartsController from '../controllers/carts.controller.js'

const cartsRouter = express.Router();

cartsRouter.get('/', cartsController.getCarts) //Lee todos Cart
cartsRouter.post('/', cartsController.createCart) // Crea un Cart
cartsRouter.get('/:cid', cartsController.getCart) // Busca un Cart
cartsRouter.delete('/:cid', cartsController.deleteCart) //Borra un Cart
cartsRouter.post('/:cid/product/:pid/:qty', cartsController.addToCart) //Crea item dentro Cart



cartsRouter.delete('/:cid/product/:pid', cartsController.deleteFromCart)

/*
cartsRouter.put('/:cid/product/:pid/:qty', cartsController.addToCart)
cartsRouter.put('/:cid/product/:pid', cartsController.deleteFromCart)
*/

export default cartsRouter;