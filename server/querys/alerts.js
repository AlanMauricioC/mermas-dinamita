const con = require('../DB/connection')

function alerts (req, res) {
    var restockAlerts = []
    var expirationAlerts = []

    con.query("SELECT ns.idSupply AS id, typeNotification, nameSupply AS name, quantitySupply AS quantity, ((minQuantitySupply+(maxQuantitySupply-minQuantitySupply)/2)-quantitySupply) AS expectedQuantity FROM notificationssupply AS ns INNER JOIN supplies AS s ON ns.idSupply=s.idSupply", function (err, result) {
        if (err) {
            console.log("Error" , err)
            res.status(500).json({err})
        }
        else {
            console.log(result)
            result.forEach(element => {
                let alert = {}
                switch (element.typeNotification) {
                    case 1:
                        alert.id = element.id
                        alert.name = element.name
                        alert.quantity = element.quantity
                        alert.expectedQuantity = element.expectedQuantity
                        restockAlerts.push(alert)
                        break
                    case 2:
                        alert.id = element.id
                        alert.name = element.name
                        alert.quantity = element.quantity
                        alert.expectedQuantity = element.expectedQuantity
                        expirationAlerts.push(alert)
                        break
                }
            })
            

            con.query("SELECT nw.idWaste AS id, typeNotification, registrationDateNotifWaste AS date, nameSupply AS name FROM notificationswaste AS nw INNER JOIN wastes AS w ON nw.idWaste=w.idWaste INNER JOIN supplies AS s ON w.idSupply=s.idSupply", function(err, result) {
                if(err) {
                    console.log("Error" , err)
                    res.status(500).json({err})
                }
                else {
                    result.forEach(element => {
                        let alert = {}
                        switch (element.typeNotification) {
                            case 1:
                                alert.id = element.id
                                alert.name = element.name
                                alert.date = element.quantity
                                restockAlerts.push(alert)
                                break
                            case 2:
                                alert.id = element.id
                                alert.name = element.name
                                alert.date = element.quantity
                                expirationAlerts.push(alert)
                                break
                        }
                    })
                    
                    res.status(200).json({ restockAlerts: restockAlerts, expirationAlerts: expirationAlerts})
                }
            })
        }
    })
}

function deleteAlert (req, res) {
    switch(req.body.type) {
        case "waste":
            qry = "DELETE FROM notificationswaste WHERE idWaste=?"
            break
        case "supply":
            qry = "DELETE FROM notificationssupply WHERE idSupply=?"
            break
    }

    con.query(qry, values[req.body.id], function(err, result) {
        if(err) {
            console.log("Error" , err)
            res.status(500).json({err})
        }
        else {
            console.log("delete "+result.affectedRows+" notifications"+req.body.type+", ID: "+ req.body.id)
            res.status(200).json("delete "+result.affectedRows+" notifications"+req.body.type+", ID: "+ req.body.id)
        }
    })
}

module.exports = {
	alerts,
    deleteAlert
}