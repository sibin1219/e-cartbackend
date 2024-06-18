const wishlists = require('../Models/wishlistSchema')

//add to wishlist
exports.addToWishlist = async(req,res)=>{
    const{id,title,price,image} =req.body;
    const userId = req.payload
    try{
        const item = await wishlists.findOne({id,userId})
        if(item){
            res.status(401).json("product is already in the wishlist")
        }else{
            const product = new wishlists({
                id,title,price,image,userId
            })
            await product.save();
            res.status(200).json("product added successfully")
        }
    }
    catch(err){
        res.status(404).json(err)
    }

   
}


exports.getWishlist = async(req,res)=>{
    const userId = req.payload
    try{
        const wishlist = await wishlists.find({userId})


        res.status(200).json(wishlist)

        
    }catch(err){
        res.status(404).json(err)
    }
}


exports.deleteWishlist = async(req,res)=>{
    const {id}= req.payload
    const userId = req.payload
    try{
        const deleteItem = await wishlists.deleteOne({id})
        if(deleteItem){
            const wishlist = await wishlists.find({userId})
            res.status(200).json(wishlist)
        }


        

        
    }catch(err){
        res.status(404).json(err)
    }
}