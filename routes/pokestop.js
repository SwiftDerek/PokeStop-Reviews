var express = require("express");
var router = express.Router();
var Pokestop = require("../models/pokestop");
var middleware = require("../middleware/index.js");

// INDEX
router.get("/", function(req, res){
    // Get all pokestops from DB
    Pokestop.find({}, function(err, pokestops){
       if(err){
           console.log(err);
       } else {
            res.render("pokestops/index", {pokestops: pokestops});
       }
    });
});
// CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to pokestops array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newPokestop = {name: name, image: image, description: desc, author: author};
    // Create a new pokestop and save to database
    Pokestop.create(newPokestop, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           res.redirect("/pokestops");
       }
    });
});
// NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("pokestops/new");
});
// SHOW - shows more info about one pokestop
router.get("/:id", function(req, res){
    // find pokestop with id
    Pokestop.findById(req.params.id).populate("comments").exec(function(err, foundPokestop){
        if(err){
            console.log(err);    
        } else {
            // render show template with pokestop
            res.render("pokestops/show", {pokestop: foundPokestop});       
        }
    });
});

// EDIT CAMPGROUND
router.get("/:id/edit", middleware.checkPokestopOwnership, function(req, res) {
    Pokestop.findById(req.params.id, function(err, foundPokestop){
        if (!err){
            res.render("pokestops/edit", {pokestop: foundPokestop});
        }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkPokestopOwnership, function(req, res){
    // find and update the correct pokestop
    Pokestop.findByIdAndUpdate(req.params.id, req.body.pokestop, function(err, updatedPokestop){
        if(err){
            res.redirect("/pokestops");
        } else {
            res.redirect("/pokestops/" + req.params.id);
        }    
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkPokestopOwnership, function(req, res){
    Pokestop.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/pokestops");
        } else {
            res.redirect("/pokestops");
        }    
    });
});

module.exports = router;