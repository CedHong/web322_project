const autheticationCheck = (req, res, next)=> {

    if(req.session.userInfo){
        

        next();


    }else{

        res.redirect("/login");

    }


}

module.exports = autheticationCheck;