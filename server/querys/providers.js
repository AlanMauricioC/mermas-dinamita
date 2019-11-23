const con = require('../DB/connection')

function getProviders (req, res){
    con.query('SELECT idProvider AS id, nameProvider AS name FROM providers WHERE statusProvider=1', function (err, result) {
        if (err) {
            console.log('Error' , err)
            res.status(500).json({err})
        }else
            res.status(200).json({ providers : result })
    })
}

module.exports = {
	getProviders,
}