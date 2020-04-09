const dashBoardLoader = (req, res)=> {

    if(req.session.userInfo.role == "clerk"){

        res.render("admindash", {
            title: "Admin Dashboard",
            header: "Admin Dashboard"});


    }else{

        res.render("dashboard", {
            title: "User Dashboard",
            header: "User Dashboard"});

    }


}

module.exports = dashBoardLoader;