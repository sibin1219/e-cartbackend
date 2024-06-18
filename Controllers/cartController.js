const carts = require('../Models/cartSchema')

//addToCart

exports.addToCart =async(req,res)=>{
    //get details
    const{id,title,price,image,quantity} =req.body;
    const userId = req.payload
    try{
        const cartitem = await carts.findOne({id,userId})
        if(cartitem){
            cartitem.quantity+=1
            cartitem.grandTotal=cartitem.quantity*cartitem.price
            await cartitem.save();
            res.status(200).json("product updated successfully")
        }else{
            const cartNewProduct = new carts({
                id,title,price,image,quantity,userId
            });
            cartNewProduct.grandTotal = cartNewProduct.quantity*cartNewProduct.price;
            await cartNewProduct.save();
            res.status(200).json("product added successfully")
        }
    }
    catch(err){
        res.status(404).json(err)
    }

   
}



exports.getcart=async(req,res)=>{
    const userId = req.payload
    try{
        const allCartProducts = await carts.find({userId})
        res.status(200).json(allCartProducts)
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.deleteCart = async(req,res)=>{
    const {id}= req.payload
    const userId = req.payload
    try{
        const deleteCartProduct = await carts.deleteOne({id})
        if(deleteCartProduct){
            const allCartProducts = await carts.find({userId})
            res.status(200).json(allCartProducts)
        }


        

        
    }catch(err){
        res.status(404).json(err)
    }


   
}

exports.incrementCart=async(req,res)=>{
    const {id}= req.params
const userId = req.payload
try{
    const incrementCartProduct = await carts.findOne({id,userId})
    if(incrementCartProduct){
        incrementCartProduct.quantity+=1
        incrementCartProduct.grandTotal =
        incrementCartProduct.price*incrementCartProduct.quantity

        await incrementCartProduct.save()
        const allCartProducts = await carts.find({userId})
        res.status(200).json(allCartProducts)
    }
    else{
        res.status(402).json("item not found")
    }

}catch(err){
    res.status(404).json(err)
}
}

exports.decrementCart = async(req,res) => {
    const {id} = req.params
    const userId = req.payload
    try{
        const cartProduct = await carts.findOne({id,userId})
        if(cartProduct){
            cartProduct.quantity-=1
            if(cartProduct.quantity==0){
                const deleteProduct = await carts.deleteOne({id})
                const allProducts = await carts.find({userId})
                res.status(200).json(allProducts)
            }
            else{
                cartProduct.grandTotal = cartProduct.quantity * cartProduct.price
                await cartProduct.save()
                const allProducts = await carts.find({userId})
                res.status(200).json(allProducts)
            }

        }
        else{
            res.status(401).json('Product not found')
        }
    }
    catch(err){
        res.status(404).json('failed' + err)
    }
}