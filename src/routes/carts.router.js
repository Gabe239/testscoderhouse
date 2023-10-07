import express from 'express';
import {
  createCart,
  getCartById,
  addProductToCart,
  addProductToCartTest,
  removeProductFromCart,
  updateCartProducts,
  updateProductQuantity,
  clearCart,
  purchaseCart,
} from '../controllers/carts.controller.js';
import { adminAuthorize, userAuthorize } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addProductToCart);
router.post('/:cid/productTest/:pid', addProductToCartTest);
router.delete('/:cid/products/:pid', removeProductFromCart);
router.put('/:cid', updateCartProducts);
router.put('/:cid/products/:pid', updateProductQuantity);
router.delete('/:cid', clearCart);
router.post('/:cid/purchase', purchaseCart);


export default router;