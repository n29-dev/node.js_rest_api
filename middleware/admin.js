module.exports.admin = (req, res, next) => {
    if(!req.user.admin){
        return res.send('You are not allowed')
    }else{
        next()
    }
}