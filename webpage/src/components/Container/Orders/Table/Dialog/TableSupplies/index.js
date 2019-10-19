import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { tableIcons, headCells2, getOrderDetail, updateRestockSupply, deleteRestockSupply, insertRestockSupply, setStatusRestock, localization } from './../../../../../../services/restock'
import { TextField, MenuItem } from '@material-ui/core';
import alertifyjs from "alertifyjs";

class Table extends Component {
    constructor(props) {
        super(props);
        const {row}=this.props;
        this.state = {
            columns: headCells2,
            data: row.supplies,
            idRestock: row.idRestock,
            rowStatus: row.statusRestock
        }
        console.log(row)
    }
    
    

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
                                        updateDetail(newData, oldData);
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