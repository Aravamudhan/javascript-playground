const express = require('express'),
    NodeGeocoder = require('node-geocoder'),
    multer = require('multer'),
    cloudinary = require('cloudinary'),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    router = express.Router(),
    middlewares = require("../middleware");

// ========== Image upload configuration ==========
cloudinary.config({
    cloud_name: 'mediahost',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
let storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
let imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
let upload = multer({
    storage: storage,
    fileFilter: imageFilter
})
// ========== Image upload config ends ==========
const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};
let geocoder = NodeGeocoder(options);
let MAP_API_KEY = process.env.GOOGLEMAP_API_KEY;

function renderCampgrounds(req, res) {
    Campground.find({}, (err, campData) => {
        if (err) {
            console.log("Find failed", err);
            res.redirect("/error");
        } else {
            res.render("index", {
                campData
            });
        }
    });
}

function createCampground(req, res) {
    let camp = {
        name: req.body.campName,
        price: req.body.campPrice,
        description: req.body.campDescription,
        author: {
            id: req.user.id,
            username: req.user.username
        }
    };
    cloudinary.v2.uploader.upload(req.file.path, {
        user_filename: true
    }, function (err, imgResult) {
        camp.image = {};
        if (err) {
            // If there was problem uploading the image, return the default image
            req.flash('error', 'There was some problem uploading the image. Please try again.');
            camp.image.url = "http://res.cloudinary.com/mediahost/image/upload/v1525008377/default_image.jpg";
            camp.image.publicId = "default_image.jpg";
        } else {
            // add cloudinary url for the image to the campground object under image property
            camp.image.url = imgResult.secure_url;
            camp.image.publicId = imgResult.public_id;
            const locationObj = JSON.parse(req.body.campLocation);
            geocoder.geocode(locationObj.name, function name(err, data) {
                if (err || !data.length) {
                    console.error(err);
                    req.flash("error", "Invalid location");
                    return res.redirect("back");
                }
                camp.location = locationObj.name;
                camp.lat = locationObj.lat;
                camp.lng = locationObj.lng;
                Campground.create(camp, (err, result) => {
                    if (err) {
                        console.log('Error saving[', camp, '] [', err, ']');
                        res.redirect("/error");
                    } else {
                        console.log('Campground is created', result);
                        res.redirect("/campgrounds/" + result.id);
                    }
                });
            });
        }
    });
}

function renderCreateCampground(req, res) {
    res.render("new", {
        MAP_API_KEY
    });
}

function renderCampground(req, res) {
    let id = req.params.id;
    Campground.findById(id).populate('comments').exec((err, result) => {
        if (err) {
            console.log("Error finding campground with id", id, err);
            res.redirect("/error");
        } else {
            res.render("show", {
                result,
                MAP_API_KEY
            });
        }
    });
}

function renderEditCampground(req, res) {
    let id = req.params.id;
    Campground.findById(id, (err, campground) => {
        if (err) {
            console.log("Error finding campground with id", id, err);
            let errorMessage = "Error finding the campground for you. Try again later.";
            res.redirect("/error?errorMessage=" + errorMessage);
        } else {
            let action = "/campgrounds";
            let formTitle = "Editing the campground details";
            res.render("edit", {
                campground,
                MAP_API_KEY
            });
        }
    });
}

function editCampground(req, res) {
    const locationObj = JSON.parse(req.body.campground.location);
    geocoder.geocode(locationObj.name, async function (err, data) {
        if (err || !data.length) {
            console.log(err);
            req.flash('error', 'Invalid address');
            return res.redirect('back');
        }
        req.body.campground.location = locationObj.name;
        req.body.campground.lat = locationObj.lat;
        req.body.campground.lng = locationObj.lng;
        Campground.findById(req.params.id, async function (err, campResult) {
            if (err) {
                console.log("Error finding campground with id", id);
                console.error(err);
                let errorMessage = "Error finding and updating the campground";
                res.redirect("/error?errorMessage=" + errorMessage);
            }
            if (req.file) {
                try {
                    await cloudinary.v2.uploader.destroy(campResult.image.publicId);
                    let cloudinaryResult = await cloudinary.v2.uploader.upload(req.file.path);
                    campResult.image.url = cloudinaryResult.secure_url;
                    campResult.image.publicId = cloudinaryResult.public_id;
                } catch (err) {
                    req.flash("error", err);
                    return res.redirect("back");
                }
            }
            const {
                name,
                description,
                price,
                location,
                lat,
                lng
            } = req.body.campground;
            campResult.name = name;
            campResult.description = description;
            campResult.price = price;
            campResult.location = location;
            campResult.lat = lat;
            campResult.lng = lng;
            campResult.save();
            req.flash("success", "Successfully Updated!");
            res.redirect("/campgrounds/" + campResult._id);
        });
    });
}

function deleteCampground(req, res) {
    let id = req.params.id
    Campground.findById(id, (err, result) => {
        if (err || !result) {
            console.log("Error finding campground with id", id);
            res.redirect("/error");
        } else {
            cloudinary.v2.uploader.destroy(result.image.publicId, (err, imgResult) => {
                if (err) {
                    console.log("Error delete the image from cloudinary", err);
                } else {
                    console.log("Cloudinary result", imgResult);
                }
                result.remove();
                res.redirect("/campgrounds");
            });
        }
    });
}

router.get("/", renderCampgrounds);
router.post("/", middlewares.isLoggedInPage, upload.single('image'), createCampground);
router.get("/new", middlewares.isLoggedInPage, renderCreateCampground);
router.get("/:id", renderCampground);
router.get("/:id/edit", middlewares.checkCampgroundAuthorization, renderEditCampground);
router.put("/:id", middlewares.checkCampgroundAuthorization, upload.single('image'), editCampground);
router.delete("/:id", middlewares.checkCampgroundAuthorization, deleteCampground);
module.exports = router;