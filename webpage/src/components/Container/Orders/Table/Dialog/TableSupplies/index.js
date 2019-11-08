import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { tableIcons, getOrderDetail, updateRestockSupply, deleteRestockSupply, insertRestockSupply, setStatusRestock, localization } from './../../../../../../services/restock'
import { TextField, MenuItem } from '@material-ui/core';
import alertifyjs from "alertifyjs";
import { getSupplies } from "./../../../../../../services/supplies";

class Table extends Component {
    constructor(props) {
        super(props);
        const {row}=this.props;
        const getDateFormat=(date)=>{
            let newDate="";
            const getMonth=(month)=>{
                switch(month){
                    case "Jan":
                        return "01";
                    case "Feb":
                        return "01";
                    case "Mar":
                        return "01";
                    case "Apr":
                        return "01";
                    case "May":
                        return "01";
                    case "Jun":
                        return "01";
                    case "Jul":
                        return "01";
                    case "Ago":
                        return "01";
                    case "Sep":
                        return "01";
                    case "Oct":
                        return "01";
                    case "Nov":
                        return "01";
                    case "Dec":
                        return "01";
                    default:
                        return month;
                }
            }
            if(date) if(typeof date==='string') newDate=date.substring(0,10); else {
                date=date+"";
                newDate=date.substring(11,15)+"-"+getMonth(date.substring(4,7))+"-"+date.substring(8,10);
            }
            else return "Fecha no registrada"
            return newDate
        }
        this.state = {
            columns: [
                {
                    title: 'Insumo', field: 'idSupply',
                    lookup: {}, 
                    editable: 'never'
                },
                {title: 'Cantidad', field: 'quantityRestockSupply', type: "numeric"},
                {title: 'Costo', field: 'costRestockSupply', type: "numeric"},
                {
                    title: 'Fecha de llegada', field: 'arrivalDateRestockSupply', type:"date", render: rowData => getDateFormat(rowData.arrivalDateRestockSupply)
                },
                {
                    title: 'Fecha de caducidad', field: 'sellByDateRestockSupply', type:"date", render: rowData => getDateFormat(rowData.sellByDateRestockSupply)
                },
                {title: 'Proveedor', field: 'idProvider', lookup:{1: "Proveedor 1", 2: "Proveedor 2", 3: "Proveedor 3"}},
                {
                    title: 'Estado',
                    field: 'statusRestockSupply',
                    lookup: { 0: "Cancelado", 1: 'Pendiente', 2: 'Aprobado', 3: "No aprobado", 4: "Pedido",5: "Entregado", 6: "Rechazado"},
                },
                {title: 'Comentarios', field: 'commentaryRestockSupply'},
            ],
            data: row.supplies,
            idRestock: row.idRestock,
            rowStatus: row.statusRestock
        }
        console.log(row)
    }

    componentDidMount(){
        this.getSupplies();
    }
    
    async getSupplies() {
        
        getSupplies().then(({ supplies }) => {
            const columns=this.state.columns;
            let aLU='{';
            for(let i=0;i<supplies.length;i++){
                if(i<supplies.length-1) aLU+='"'+supplies[i].id+'":"'+supplies[i].name+'",';
                else aLU+='"'+supplies[i].id+'":"'+supplies[i].name+'"';
            }
            aLU+='}';
            var obj = JSON.parse(aLU);
            console.log(obj);
            columns[0].lookup=obj;
            this.setState({columns})
        })
    }
    /*getSupplies(){
        
        columns[0].lookup={1: "Insumo 1", 2:"Insumo 2", 3:"Insumo 3", 4: "Insumo 4", 8: "Insumo 8"};
        this.setState({columns})
    }*/

    render() {
        const {row, change}=this.props;

        const handleChange = event => {
			const val = event.target.value
            this.setState({ rowStatus: val });
            setStatus(val);
        }

        function setStatus(status){
            const data=[
                {
                    idRestock: row.idRestock,
                    status: parseInt(status, 10)
                }
            ]
            console.log(data)
            setStatusRestock(data[0]).then(()=>{
                change();
                alertifyjs.success("Se ha actualizado el estado del pedido")
                
			}, (e) => console.error(e))
        }

        function updateDetail(newData){
            const data=[
                {
                    quantity: newData.quantityRestockSupply,
                    cost: newData.costRestockSupply,
                    arrivalDate: newData.arrivalDateRestockSupply,
                    sellByDate: newData.sellByDateRestockSupply,
                    idProvider: newData.idProvider,
                    status: newData.statusRestockSupply,
                    commentary: newData.commentaryRestockSupply,
                    idRestock: row.idRestock,
                    idSupply: newData.idSupply,
                }
            ]
            updateRestockSupply(data[0]).then(()=>{
				alertifyjs.success("El insumo ha sido actualizado correctamente")
			}, (e) => console.error(e))
        }

        function addDetail(newData){
            const data=[
                {
                    quantity: newData.quantityRestockSupply,
                    cost: newData.costRestockSupply,
                    idProvider: newData.idProvider,
                    commentary: newData.commentaryRestockSupply,
                    idRestock: row.idRestock,
                    idSupply: newData.idSupply,
                }
            ]
            insertRestockSupply(data[0]).then(()=>{
				//handleOpenSuccessToast()//abrir toast
                //actualizar página
                alertifyjs.success("El insumo ha sido añadido correctamente")
			}, (e) => console.error(e))
        }

        function deleteDetail(oldData){
            const data=[
                {
                    idRestock: row.idRestock,
                    idSupply: oldData.idSupply,
                }
            ]
            deleteRestockSupply(data[0]).then(()=>{
				alertifyjs.success("El insumo se ha eliminado correctamente")
			}, (e) => console.error(e))
        }
        
        return (
            <div>
                <TextField
                    id="statusRestock"
                    select
                    value={this.state.rowStatus}
                    label="Estado"
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="0">
                        Cancelado
                    </MenuItem>
                    <MenuItem value="1">
                        Pendiente
                    </MenuItem>
                    <MenuItem value="2">
                        Aprobado
                    </MenuItem>
                    <MenuItem value="3">
                        No aprobado
                    </MenuItem>
                    <MenuItem value="4">
                        Pedido
                    </MenuItem>
                    <MenuItem value="5">
                        Entregado
                    </MenuItem>
                    <MenuItem value="6">
                        Rechazado
                    </MenuItem>
                </TextField>
                <MaterialTable
                    title={"Insumos del pedido "+row.idRestock}
                    columns={this.state.columns}
                    data={this.state.data}
                    icons={tableIcons}
                    localization={localization}
                    options={{
                        actionsColumnIndex: -1
                    }}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    const data = this.state.data;
                                    data.push(newData);
                                    this.setState({ data }, () => resolve());
                                    addDetail(newData);
                                }
                                resolve()
                            }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        const data = this.state.data;
                                        const index = data.indexOf(oldData);
                                        data[index] = newData;
                                        this.setState({ data }, () => resolve());
                                        updateDetail(newData);
                                    }
                                    resolve()
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    let data = this.state.data;
                                    const index = data.indexOf(oldData);
                                    data.splice(index, 1);
                                    this.setState({ data }, () => resolve());
                                    deleteDetail(oldData);
                                }
                                resolve()
                            }, 1000)
                            }),
                        }}
                />
            </div>
        )
    }
}

export default Table;