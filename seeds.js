var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTfldHlALyioKIXnqIQU6Mu9o4NqE0xnnG7J-A-nRd2IU_PHxsv",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa",
        image: "http://onmilwaukee.com/images/articles/ca/camping/camping_fullsize_story1.jpg?20080730123152",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor",
        image: "http://www.wildnatureimages.com/images%203/060731-372..jpg",
        description: "blah blah blah"
    }
];


function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds"); 
            // add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    // create a comment
                    Comment.create(
                        {
                            text: "This place is great!",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                            }
                        });
                }
            });        
        });
    });
}

module.exports = seedDB;
