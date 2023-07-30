const express =  require('express');
const route = express.Router(); 
const controller = require('../controller/controller'); 
const userdb = require('../model/model')
const bcrypt = require('bcrypt');
const session = require('express-session');


const services = require('../services/render')

route.use(session({secret: 'your-session-secret'}))


route.get('/',services.homeRoutes)

route.get('/add_user',services.add_user)

route.get('/update_user/:id',services.update_user)

route.get('/login',services.login)

route.get('/logout',services.logout)

route.get('/signup',services.signup)

route.get('/adminlogin',services.adminlogin)

route.get('/adminlogout',services.adminlogout)

route.get('/admin_dashboard',services.admin_dashboard)

    //api

    route.post('/api/users',controller.create);
    route.get('/api/users',controller.findall);
    route.get('/api/user/:id',controller.findone);
    route.post('/api/users/:id',controller.update);
    route.get('/api/users/:id',controller.delete);


//signup

route.post('/signup',(req,res) => {
    console.log(req.body);
    controller.create(req,res)
    
})

//login

route.post ('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    userdb.findOne({ email }) 
      .then (async user => {
        if (user) {
          const passwordMatch = await bcrypt.compare(password,user.password)
          if(passwordMatch){
            console.log(user);
            req.session.user = user;
            req.session.loggedIn = true;
            req.session.isAdmin = false;
            res.redirect('/')

          } else{
            res.render('login', {message: "email or password incorrect"})
          }
        } else {
          console.log('User not found!');
          res.status(404).alert('User not found');
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  });

//admin login

  route.post ('/adminlogin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    userdb.findOne({ email : email , isAdmin: "true" }) 
      .then (async user => {
        if (user) {
          const passwordMatch = await bcrypt.compare(password,user.password)
          if(passwordMatch){
            console.log(user);
            req.session.user = user;
            req.session.loggedIn = true;
            req.session.isAdmin = true;
            res.redirect('/admin_dashboard')

          } else{
            res.render('login', {message: "email or password incorrect"})
          }
        } else {
          console.log('User not found!');
          res.status(404).send('User not found');
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  });
  

    module.exports = route