var Userdb = require('../model/model');
var bcrypt = require('bcrypt');

// password encryption

const securePassword = async (password) =>{
    try {
        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash
    } catch (error) {
        console.log(error.message);
    }
}
 
// ceate and save new user
exports.create = async (req,res)=>{
    //validate user
    if(!req.body){
        res.status(400).send({message: 'content cannot be empty!'});
        return
    }
    // create user
    console.log(req.body);
    sPassword = await securePassword(req.body.password)
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: sPassword,
        gender: req.body.gender
    })

    //save usersdata in database
    user
    .save(user)
    .then(data => {
        // res.send(data)
        res.redirect('back');
    })
    .catch(err => {
        res.status(500).send({
            message: err.message ||"some error occured while creating a create operator"
        });
    });
    
}

//retrieve and return all users 
exports.findall = (req,res)=>{
    Userdb.find({"isAdmin": {$exists : false}}).lean()
    .then(User => {
        console.log(User);
        // res.send(User)
        res.render('admin_dashboard', {users: User})
    })
    .catch(err =>{
        res.status(500).send({message: err.message|| "Error occured while retrieving user information"})
    }) 
}

//  retrieve and return a single user
exports.findone = (req,res)=>{
        // if(!req.query.id){
        const id = req.params.id;

        Userdb.findById(id).lean()
        .then(data =>{
            if(!data){
                res.status(404).send({message: "no user found with id"+id})
            }else{
                console.log(data);
                res.render("update_user", {user: data})
            }
        })
        .catch(err =>{
            res.status(500).send({message: "error retrieving user with id"+id})
        })

    // }else{
   
    
// }

}
// update a new identified user by id
exports.update = (req,res)=>{
if(!req.body){
    return res
        .status(400)
        .send({message: "data to be updated cannot be empty"})
}

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({message: `cannot update user with ${id}. maybe user not found`})
        }else{
            res.redirect('/admin_dashboard')
        }
    })
    .catch(err =>{
        res.status(500).send({message: 'error in updating user information'})
    })
}

// delete a user with specified user id in the request 
exports.delete  = (req,res)=>{
const id = req.params.id;

Userdb.findByIdAndDelete(id)
.then(data => {
    if(!data){
        res.status(404).send({message: `cannot delete with ${id}. maybe it is wrong`})
    }else{
        res.redirect('/admin_dashboard')
    }
})
.catch(err=>{
    res.status(500).send({message: "could not delete user with id" +id })
})
}