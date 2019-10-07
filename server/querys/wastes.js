var con = require('../DB/connection');

function deleteWaste(req, res) {
    con.query("UPDATE wastes SET statusWaste=0 WHERE idWaste=?", [req.body.idWaste], function(err, result, fields) {
        if (err) throw err;
        res.send("delete "+result.affectedRows+" waste, idWaste: "+ req.body.idWaste).status(200);
    });
};

module.exports = {
    deleteWaste
};