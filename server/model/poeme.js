// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var user = require('./user.js');
var _ = require("underscore");

var schema =  mongoose.Schema;
//
var poemeSchema = mongoose.Schema({
    title :String, 
    content :String, 
    from :String,  
    id_auteur :{type : schema.Types.ObjectId, ref:'user'},
    denounced  :Boolean,
    isPublic : Boolean

});


// create the model for users and expose it to our app
var db = mongoose.model('poeme', poemeSchema);
module.exports.poeme = db;

//
exports.create=function (req, res , next) {
    var params = req.body;
    var newPoeme = new db();

    newPoeme.title  = params.title, 
    newPoeme.content  = params.content, 
    newPoeme.from  = params.from,  
    newPoeme.id_auteur  = params.id_auteur, 
    newPoeme.denounced   = params.denounced ,
    newPoeme.isPublic = params.isPublic;


    if(!newPoeme.title || !newPoeme.content || !newPoeme.isPublic){
        return res.send({message : "Les parametres sont incorrects", code : 1});
    }


    newPoeme.save(function(err, results){
        if (err) {
            res.send({message : err, code : 1});
        }
        else{
            res.send({message : "Le poeme a bien été créer.", code : 0, result : results});
        }
    });
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

    db.findById(id, function(err, doc) {
        if (err || !doc) {
            return next(err);
        }else{
            var res_deletion = doc.remove();
            return res.json(res_deletion);
        }
        //
    });

};

exports.edit = function(req, res, next){

    var id = req.params.id,
    params = req.body,
    newer,
    query = ({_id   :   id});

    title  = params.title, 
    content  = params.content, 
    from  = params.from,  
    denounced   = params.denounced ,
    isPublic = params.isPublic;

    db.findById(id, function(err, poeme){
        if (err) 
            next(err);
        else{                  
            //à voir apres
            var objToUp = _.omit(poeme, "_id");

            //verifier le comportement kan le poeme n'est pas trouvé

            if (title!=null) {objToUp.title = title}; 
            if (content!=null) {objToUp.content = content};
            if (from!=null) {objToUp.from =from};
            if (denounced!=null) {objToUp.denounced=denounced};
            if (isPublic!=null) {objToUp.isPublic=isPublic};
            console.log("objtoUp : ", objToUp);
            res.send(poeme);

        }
    })
};
