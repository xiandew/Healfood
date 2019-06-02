let mongoose = require("mongoose");
let Restaurant = mongoose.model("restaurants");

let map = function (req, res) {
    Restaurant.findById(req.params.rstrnt_id, function (err, rstrnt) {
        if (!err && rstrnt) {
            res.render('map', {
                title: "Map",
                rstrntData: [rstrnt]
            });
        } else {
            Restaurant.find(function (err, rstrnts) {
                if (!err) {
                    res.render('map', {
                        title: "Map",
                        rstrntData: rstrnts
                    });
                } else {
                    res.sendStatus(404);
                }
            });
        }
    });
};

module.exports.map = map;
