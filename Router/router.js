const express = require ('express')
const cartController = require('../Controllers/cartController')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const wishlistController = require('../Controllers/wishlistController')
const router = express.Router()
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
//getAllProducts
router.get('/allproducts',productController.getAllProducts)

//register
router.post('/user/register',userController.register)

//login
router.post('/user/login',userController.login)

//viewaproduct
router.get('/viewproduct/:id',productController.viewProduct)

//add to wishlist
router.post('/addToWishlist',jwtMiddleware,wishlistController.addToWishlist)

//get wishlist
router.get('/getWishlist',jwtMiddleware,wishlistController.getWishlist)

//deleete

router.delete('/deletewishlist/:id',jwtMiddleware,wishlistController.deleteWishlist)

//addtocart
router.post('/addCart',jwtMiddleware,cartController.addToCart)

//getCart
router.get('/getCart',jwtMiddleware,cartController.getcart)

//deleteCart

router.delete('/deleteCart/:id',jwtMiddleware,cartController.deleteCart)

//increment
router.get('/incrementCart/:id',jwtMiddleware,cartController.incrementCart)

//decrementcart

router.get('/decrementCart/:id',jwtMiddleware,cartController.decrementCart)


module.exports = router