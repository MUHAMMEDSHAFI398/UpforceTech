module.exports={
    login:async(req,res,next)=>{
        console.log(req.body)
        console.log(req.file.path) 
        res.json({status:true})
    }
}