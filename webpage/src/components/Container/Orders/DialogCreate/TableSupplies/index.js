import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { headCells3, getOrderDetail, deleteRestockSupply, updateRestockSupply, createRestock, tableIcons, localization, insertOnlyRestock, insertRestockSupply } from './../../../../../services/orders'
import { Button, Grid } from '@material-ui/core';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: headCells3,
            data: [],
            create: true,
            idRestock: 0
        }
    }

    handleCreateRestock=()=>{
        //const idSupplies=()=>
        const {handleClose}=this.props;
        const data={
            idUser: 1,
            idSupplies: this.state.data
        }
        handleClose();
        console.log(data)
        /*createRestock(data).then((idRestock )=>{
            console.log(idRestock);
            //handleOpenSuccessToast()//abrir toast
            //actualizar página
        }, (e) => console.error(e))*/
    }

    updateDetail(newData){
        const data=[
            {
                quantity: newData.quantityRestockSupply,
                cost: newData.costRestockSupply,
                arrivalDate: newData.arrivalDateRestockSupply,
                sellByDate: newData.sellByDateRestockSupply,
                idProvider: newData.idProvider,
                status: newData.statusRestockSupply,
                commentary: newData.commentaryRestockSupply,
                idRestock: this.state.idRestock,
                idSupply: newData.idSupply,
            }
        ]
        updateRestockSupply(data[0]).then(()=>{
            //handleOpenSuccessToast()//abrir toast
            //actualizar página
        }, (e) => console.error(e))
    }

    deleteDetail(oldData){
        const data=[
            {
                idRestock: this.state.idRestock,
                idSupply: oldData.idSupply,
            }
        ]
        deleteRestockSupply(data[0]).then(()=>{
            //handleOpenSuccessToast()//abrir toast
            //actualizar página
        }, (e) => console.error(e))
    }

    addDetail(newData){
        const {change}=this.props;
        if(this.state.create){
            const data=
            {
                idUser: 1
            };
            
            insertOnlyRestock(data).then((idRestock)=>{
                this.setState({idRestock: idRestock.idRestock});
                const data2=[
                    {
                        quantity: newData.quantityRestockSupply,
                        cost: newData.costRestockSupply,
                        idProvider: newData.idProvider,
                        commentary: newData.commentaryRestockSupply,
                        idRestock: idRestock.idRestock,
                        idSupply: newData.idSupply,
                    }
                ];
                insertRestockSupply(data2[0]).then(()=>{
                    this.setState({create: false})
                    change();
                }, (e) => console.error(e))
            }, (e) => console.error(e))
        }else{
            const data=[
                {
                    quantity: newData.quantityRestockSupply,
                    cost: newData.costRestockSupply,
                    idProvider: newData.idProvider,
                    commentary: newData.commentaryRestockSupply,
                    idRestock: this.state.idRestock,
                    idSupply: newData.idSupply,
                }
            ]
            insertRestockSupply(data[0]).then(()=>{
				//handleOpenSuccessToast()//abrir toast
				//actualizar página
			}, (e) => console.error(e))
        }
        /*const data=[
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
            }, (e) => console.error(e))*/
    }

    render() {

        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <MaterialTable
                            title="Insumos del nuevo pedido"
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
                                        this.addDetail(newData);
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
                                        this.updateDetail(newData, oldData);
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
                                        this.deleteDetail(oldData);
                                    }
                                    resolve()
                                    }, 1000)
                                }),
                            }}
                        />
                    </Grid>
                    <Grid item xs={10} justify="flex-end">
                    </Grid>
                    
                    <Grid item xs={2} justify="flex-end">
                    <br/>
                        <Button onClick={this.handleCreateRestock} variant="contained" color="primary">
                            Finalizar
                        </Button>
                    </Grid>
                </Grid>
            
            
            </div>
        )
        }
}

export default Table;