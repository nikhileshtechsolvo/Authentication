exports.fieldValidation=((req,res,next)=>{
    console.log(req.body.role)
    if(!req.body.role){
        res.send({message:"role required"})
        return
    }
    next()
})