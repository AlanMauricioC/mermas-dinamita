import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { headCells3, getOrderDetail, updateRestockSupply, createRestock, tableIcons, localization } from './../../../../../services/orders'
import { Button, Grid } from '@material-ui/core';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: headCells3,
            data: []
        }
    }

    handleCreateRestock=()=>{
        //const idSupplies=()=>
        const data={
            idUser: 1,
            idSupplies: this.state.data
        }
        console.log(data)
        createRestock(data).then(()=>{
            //handleOpenSuccessToast()//abrir toast
            //actualizar página
        }, (e) => console.error(e))
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <MaterialTable
                            title="Nuevo pedido"
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
                            Generar pedido
                        </Button>
                    </Grid>
                </Grid>
            
            
            </div>
        )
        }
}

export default Table;