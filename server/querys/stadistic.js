const con = require('../DB/connection')

function stadisticWastes (req, res){
    con.query('SELECT typeWaste AS type, DATE_FORMAT(registrationDateWaste, "%Y-%m-%d") AS `date` FROM wastes WHERE DATE(registrationDateWaste) BETWEEN ? AND ? ORDER BY registrationDateWaste', [req.body.dateStart, req.body.dateEnd], function (err, result) {
        if (err) {
            console.log('Error' , err)
            res.status(500).json({err})
        }else
            con.query('SELECT DATE_FORMAT(registrationDateWaste, "%Y-%m-%d") AS `date` FROM wastes WHERE DATE(registrationDateWaste) BETWEEN ? AND ? GROUP BY DATE(registrationDateWaste)', [req.body.dateStart, req.body.dateEnd], function (err, resultDate) {
                if(err) {
                    console.log('Error' , err)
                    res.status(500).json({err})
                }
                else {
                    var dates = []

                    var data1 = []
                    var data2 = []
                    var data3 = []
                    var data4 = []
                    var data5 = []

                    resultDate.forEach(elementDate => {
                        var cont1 = 0
                        var cont2 = 0
                        var cont3 = 0
                        var cont4 = 0
                        var cont5 = 0

                        result.forEach(element => {
                            if(elementDate.date === element.date) {
                                switch (element.type) {
                                    case 1:
                                        cont1++;
                                        break;
                                    case 2:
                                        cont2++;
                                        break;
                                    case 3:
                                        cont3++;
                                        break;
                                    case 4:
                                        cont4++;
                                        break;
                                    case 5:
                                        cont5++;
                                        break;
                                }
                            }
                        })

                        dates.push(elementDate.date)

                        data1.push(cont1);
                        data2.push(cont2);
                        data3.push(cont3);
                        data4.push(cont4);
                        data5.push(cont5);
                    })

                    var stadistics1 = {'name': 'Reutilizable', 'data': data1}
                    var stadistics2 = {'name': 'Devolución', 'data': data2}
                    var stadistics3 = {'name': 'Accidente', 'data': data3}
                    var stadistics4 = {'name': 'Comida de personal', 'data': data4}
                    var stadistics5 = {'name': 'Caduco', 'data': data5}

                    var series = [stadistics1, stadistics2, stadistics3, stadistics4, stadistics5]

                    res.status(200).json({ series : series, dates: dates })
                }
            })
    })
}

function stadisticRestocks (req, res){
    con.query('SELECT rs.idSupply AS id FROM restocksupply as rs INNER JOIN restock as r ON rs.idRestock=r.idRestock INNER JOIN supplies as s ON rs.idSupply=s.idSupply WHERE rs.statusRestockSupply=5 AND DATE(r.registrationDateRestock) BETWEEN ? AND ? GROUP BY rs.idSupply ORDER BY rs.idSupply;', [req.body.dateStart, req.body.dateEnd], function(err, resultId) {
        if(err) {
            console.log('Error' , err)
            res.status(500).json({err})
        }
        else {
            con.query('SELECT rs.idSupply AS id, s.nameSupply AS name, rs.quantityRestockSupply AS quantity, DATE_FORMAT(r.registrationDateRestock, "%Y-%m-%d") AS `date` FROM restocksupply as rs INNER JOIN restock as r ON rs.idRestock=r.idRestock INNER JOIN supplies as s ON rs.idSupply=s.idSupply WHERE rs.statusRestockSupply=5 AND DATE(r.registrationDateRestock) BETWEEN ? AND ? ORDER BY rs.idSupply, DATE(r.registrationDateRestock);', [req.body.dateStart, req.body.dateEnd], function(err, result) {
                if(err) {
                    console.log('Error' , err)
                    res.status(500).json({err})
                }
                else {
                    con.query('SELECT DATE_FORMAT(r.registrationDateRestock, "%Y-%m-%d") AS `date` FROM restocksupply as rs INNER JOIN restock as r ON rs.idRestock=r.idRestock INNER JOIN supplies as s ON rs.idSupply=s.idSupply WHERE rs.statusRestockSupply=5 AND DATE(r.registrationDateRestock) BETWEEN ? AND ? GROUP BY DATE(r.registrationDateRestock) ORDER BY DATE(r.registrationDateRestock);', [req.body.dateStart, req.body.dateEnd], function(err, resultDate) {
                        if(err) {
                            console.log('Error' , err)
                            res.status(500).json({err})
                        }
                        else {
                            var cont = 0
                            var dates = []
                            
                            var series = []

                            resultId.forEach(elementId => {
                                var name = ''
                                var stadistic = {}

                                var tmpIndex = 0
                                var data = new Array(resultDate.length)
                                for(let index = 0; index < data.length; index++) {
                                    data[index] = 0
                                }

                                resultDate.forEach(elementDate => {
                                    result.forEach(element => {
                                        if(elementId.id == element.id) {
                                            name = element.name

                                            if(elementDate.date == element.date) {
                                                data[tmpIndex] = element.quantity
                                            }
                                        }
                                    })
                                    
                                    if(cont==0) {
                                        dates.push(elementDate.date)
                                    }

                                    tmpIndex++
                                })

                                cont = 1

                                stadistic.name = name
                                stadistic.data = data

                                series.push(stadistic)
                            })

                            res.status(200).json({ series : series, dates: dates })
                        }
                    })
                }
            })
        }
    })
}

module.exports = {
    stadisticWastes,
    stadisticRestocks
}