const con = require('../DB/connection')

function restockAlerts (req, res) {
    con.query("SELECT idSupply AS id, nameSupply AS name, quantitySupply AS quantity, ((minQuantitySupply+(maxQuantitySupply-minQuantitySupply)/2)-quantitySupply) AS expectedQuantity FROM supplies WHERE statusSupply=1 AND quantitySupply<minQuantitySupply OR quantitySupply>maxQuantitySupply", function (err, result) {
        if (err) {
            console.log("Error" , err)
            res.status(500).json({err})
        }else
            res.status(200).json({ restockAlerts : result })
    })
}

module.exports = {
	restockAlerts
}