var middlewareObj = {};
var Pokestop = require("../models/pokestop");
var Comment = require("../models/comment");

middlewareObj.checkPokestopOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Pokestop.findById(req.params.id, function(err, foundPokestop){
            if(err){
                req.flash("error", "Pokestop not found");
                res.redirect("back");
            } else {
                // does user own pokestop
                if(foundPokestop.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }       
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentsOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                // does user own pokestop
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }       
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;