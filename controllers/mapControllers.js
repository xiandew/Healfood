let mongoose = require("mongoose");
let Restaurant = mongoose.model("restaurants");

let maps = function (req, res) {
    Restaurant.findById(req.params.rstrnt_id, function (err, rstrnt) {
        if (!err && rstrnt) {
            res.render('maps', {
                rstrntData: rstrnt
            });
        } else {
            Restaurant.find(function (err, rstrnts) {
                if (!err) {
                    res.render('maps', {
                        rstrntData: rstrnts
                    });
                } else {
                    res.sendStatus(404);
                }
            });
        }
    });
};

module.exports.maps = maps;
