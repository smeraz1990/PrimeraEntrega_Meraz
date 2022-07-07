import { Router } from 'express'
import { getProductos, addProductos, updateProductos, delProductos, getProductosbyID } from "../controllers/productosController.js"
import { addCarrito, addCarritoProductos, getCarritoProductosbyID, delCarrito, delCarritoProductos } from "../controllers/carritoController.js"
const router = Router()

//Funciones para Productos
router.get('/productos', getProductos)
router.get('/productos/:id', getProductosbyID)
router.post('/productos', addProductos)
router.put('/productos/:id', updateProductos)
router.delete('/productos/:id', delProductos)

//Funciones para Carrito
router.get('/carrito/:id/productos', getCarritoProductosbyID)
router.post('/carrito', addCarrito)
router.post('/carrito/:id/productos', addCarritoProductos)
router.delete('/carrito/:id', delCarrito)
router.delete('/carrito/:id/productos/:id_prod', delCarritoProductos)


export default router