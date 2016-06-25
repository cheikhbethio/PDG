// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var _ = require("underscore");

var schema =  mongoose.Schema;

var userSchema = mongoose.Schema({
    local            : {  
        email               : String,
        password            : String,
        firstname           : String,
        lastname            : String,
        login               : String,
        right               : String,
        idPic               : String,   
        phone               : String, 
        status              : Boolean
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
var db = mongoose.model('user', userSchema);
module.exports.user = db;

//
exports.create=function (req, res , next) {
    var params = req.body;
    var newUser = new db();
    var email = params.login;
    var login = params.login;
    newUser.local.email = email;
    newUser.local.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    newUser.local.firstname  = params.firstname;
    newUser.local.lastname   = params.lastname;
    newUser.local.login   = params.login;
    newUser.local.right   = "";
    newUser.local.idPic   = "";   
    newUser.local.phone   = "";
    newUser.local.status  = "";

    db.findOne({'local.email' : email}, function(err, user){
        if (err) {next (err)} 
        else{
            if (user) {
                console.log("email already use!!!!");
                res.send({message : "email is already used!", code : 1});
                //res.sendStatus(401, {error : '1'});
                return next();
            }

        db.findOne({'local.login' : login}, function(errLogin, userLogin){
            if (errLogin) {next (errLogin)} 
            else{
                if (userLogin) {
                    console.log("login is already used!");
                    res.send({message : "login is already used!", code : 2});
                    //res.sendStatus(401, {error : '2'});
                    return next();
                }
                newUser.save(function(err, results){
                    if (err) {
                        res.send({message : err});
                        //res.sendStatus(401,{error : err.message});
                    }
                    else{
                        console.log("#### signup succes!!")
                        res.send({message : "signup succes", code : 0, result : results, body : req.body});
                    }
                });
        }})
    }})
};

exports.view =  function(req, res,next){
    db.find().exec(function(err, results){
        if (!err) {
            return res.send(results);
        } else {
            console.log(err);
            next(err);
        }
    });
};

exports.get=function(req, res, next){
    var id = req.params.id;
    db.findById(id, function(err, user){
        if (!err) {return res.json(user)} 
        else{
            console.log(err);
            next(err);
        }
    })
};


exports.delete = function(req, res, next){
    var id = req.params.id;
    db.findByIdAndRemove(id, function(err, res) {
        if (!err) {
            console.log('User deleted!');
            return res.json(res);
        }else{
            next(err);
        }
        //
    });
};

exports.edit = function(req, res, next){

    var id = req.params.id;
    var params = req.body;

    var email = params.email;
    var password = params.password;
    var firstname = params.firstname;
    var lastname = params.lastname;
    var newer =  {local : {}, facebook : {}, google : {}};
    var query = ({_id   :   id});

    db.findById(id, function(err, user){
        if (err) next(err);
        else if(user==null){
            console.log('db not found when editing!!!');
            res.sendStatus(404, {error : '0'});
            next();
        }
        else{
            db.findOne({'local.email' : email}, function(err2, user2){
                if (err2) {next (err2)} 
                else{
                    if (user.local.email != email) {
                        if (user2) {  
                            console.log("email already use!!!!");
                            res.sendStatus(401, {error : '1'});
                            return next();
                        }
                    }
                    
                    //à voir apres
                    var objToUp = _.omit(user, "_id");

                    if (email!=null) {objToUp.local.email = email}; 
                    if (password!=null) {objToUp.local.password=bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)};
                    if (firstname!=null) {objToUp.local.firstname =firstname};
                    if (lastname!=null) {objToUp.local.lastname=lastname};

                    newer.local = objToUp.local;
                    newer.facebook = objToUp.facebook;
                    newer.google = objToUp.google;

                    db.update(query, newer, function(updateErr, updateResp){
                        if (updateErr) {
                            console.log("erreur when update db");
                            next(updateErr);
                        } else{
                            res.sendStatus({error : '0'});
                            next();
                        };
                    })
                };
            })
        }
    })
};
/*
parseParams = function(from, to){
    //elem on *supprime les propietés null
    _.map(to, function(elem){
        _.has(elem, );
    })
};
*/

