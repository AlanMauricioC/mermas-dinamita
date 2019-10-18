const con = require('../DB/connection')

function getUnits (req, res){
    con.query("select * from units", function (err, result) {
        if (err) {
            console.log("Error" , err)
            res.status(500).json({err})
        }else
            res.status(200).json({ units : result })
    })
}

module.exports = {
    getUnits
}