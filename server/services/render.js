const axios = require ('axios');
const controller = require('../controller/controller'); 

exports.homeRoutes = (req,res) => {
    if(req.session.loggedIn && !req.session.isAdmin){
    res.render('index', {user: req.session.user});
}else if(req.session.loggedIn){
    res.redirect('/admin_dashboard')
}else{
    res.redirect('/login')
}
}
exports.logout = (req,res) => {
    req.session.destroy();
    res.redirect('/login')
}

exports.add_user = (req,res) => {
    res.render('add_user');
}

exports.update_user = (req,res) => {
    controller.findone(req,res)
}

exports.admin_dashboard = (req,res) => {
    if(req.session.loggedIn && req.session.isAdmin)
    {controller.findall(req,res)
    }else{
        res.redirect('/adminlogin')
    }
}
exports.adminlogin = (req,res) => {
    if(req.session.loggedIn && req.session.isAdmin)
    {res.redirect('/admin_dashboard')

}else if(req.session.loggedIn)
    {
        res.redirect('/')
    }else{
        res.render('adminlogin');}
}

exports.adminlogout = (req,res) => {
    req.session.destroy();
    res.redirect('/adminlogin')
}


exports.login = (req,res) => {
    if(req.session.loggedIn){
        res.redirect('/');
    }else{
        res.render('login')
    }
}
exports.signup = (req,res) => {
    if(req.session.loggedIn){
        res.redirect('/');
    }else{
        res.render('signup')
    }
}