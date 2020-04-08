const isInventoryClerk = (req, res, next)=> {

    if(req.session.userInfo.role == "clerk"){

        
        next();


    }else{

        res.redirect("/dashboard");

    }


}

module.exports = isInventoryClerk;