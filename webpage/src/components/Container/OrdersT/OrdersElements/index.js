import React from 'react';
import MaterialTable from 'material-table';
import TableOrderDetail from './TableOrderDetail';
import { Fab, Grid, Paper, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { getOrders } from './../../../../services/orders';
import { tableIcons, localization } from './../../../../services/restock';
import alertifyjs from "alertifyjs";
import Info from "./../../../Miscellaneous/Info";

class OrdersElements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: null,
            idOrder: null,
            orderDetail: null,
            idRecipe: null, 
            columns: [
                { title: 'Número de comanda', field: 'idOrder'},
                { title: 'Receta', field: 'nameRecipe' },
                { title: 'Fecha de registro', field: 'dateOrder', render: rowData => {
                    if(rowData.dateOrder) return rowData.dateOrder.substring(0,10);
                }  },
                
            ],
            data: [
                {idOrder: 1, idRecipe: 1, nameRecipe: "Mole poblano"},
                {idOrder: 2, idRecipe: 8, nameRecipe: "Tacos al pastor"},
            ],
            selectedOrder: null,
        }
    }

    componentDidMount() {
        this.getOrders();
    }
    
    async getOrders() {
        getOrders().then(({ orders }) => {
            this.setState({ data: orders })
            console.log(orders)
        })
    }

    handleReturnOrdersView=()=>{
        this.setState({view: null})
        this.getOrders();
    }

    handleClickNewOrder=()=>{
        this.setState({view: "orderDetail", idOrder: null});
    }

    render() {
        const {classes}=this.props;
        const {view, columns, data, idOrder, selectedOrder, orderDetail}=this.state;
        const icon=<div>asd</div>;
        if(view){
            return (
                <TableOrderDetail classes={classes} idOrder={idOrder} orderDetail={orderDetail} selectedOrder={selectedOrder} handleReturnOrdersView={this.handleReturnOrdersView}/>
            );
        }else{
            return (
                <Grid container>
                    <Grid item xs={11}/>
                    <Grid item xs={1}>
                        <Info>
                            Puedes ver los detalles de las comandas dando click sobre ellas.
                        </Info>
                    </Grid>
                    <Grid item xs={12}>

                    <MaterialTable
                        title="Órdenes"
                        columns={columns}
                        data={data}
                        icons={tableIcons}
                        localization={localization}
                        onRowClick={((evt, selectedRow, togglePanel) => {
                            this.setState({ selectedRow });
                            togglePanel();
                        })}
                        actions={[
                            {
                                icon: tableIcons.Edit,
                                tooltip: 'Modificar orden',
                                onClick: (event, rowData) => {
                                    console.log(rowData);
                                    if(rowData.supply) alertifyjs.warning("Las órdenes de insumos no se pueden modificar");
                                    else this.setState({view: "orderDetail", idOrder: rowData.idOrder, orderDetail: rowData});
                                }
                            },
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            showTitle: false,
                            search: true,
                            headerStyle:{
                                fontWeight: 'bold',
                                backgroundColor: 'lightgray',
                            },
                            searchFieldAlignment: 'left',
                            searchFieldStyle:{
                            }
                        }}
                        editable={{
                            onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        let data = this.state.data;
                                        const index = data.indexOf(oldData);
                                        data.splice(index, 1);
                                        this.setState({ data }, () => resolve());
                                        alertifyjs.success('Orden eliminada correctamente');
                                    }
                                    resolve()
                                }, 1000)
                            }),
                        }}
                        detailPanel={rowData => {
                            if(rowData.supplies[0]){
                                return (
                                    <div>
                                        <br/>
                                        <Grid container>
                                            <Grid item xs={1}/>
                                            <Grid item xs={10}>
                                                <Paper>
                                                    <Grid container>
                                                        <Grid item xs={1}/>
                                                        <Grid item xs={8}>
                                                            <h4>Insumo</h4>
                                                            <Divider/>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <h4>Cantidad</h4>
                                                            <Divider/>
                                                        </Grid>
                                                        <Grid item xs={1}/>
                                                        <Grid item xs={12}>
                                                            {rowData.supplies.map(supply => (
                                                                <Grid container>
                                                                    <Grid item xs={1}/>
                                                                    <Grid item xs={8}>
                                                                        {supply.nameSupply}
                                                                    </Grid>
                                                                    <Grid item xs={2}>
                                                                        {supply.quantityOrderSupply+" "+supply.nameUnit}
                                                                    </Grid>
                                                                    <Grid item xs={1}/>
                                                                </Grid>
                                                            ))}
                                                            <Divider/>
                                                        </Grid>
                                                        {rowData.wastes.length ? 
                                                        <Grid container>
                                                            <Grid item xs={1}/>
                                                            <Grid item xs={8}>
                                                                <h4>Merma reutilizada</h4>
                                                                <Divider/>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <h4>Cantidad</h4>
                                                                <Divider/>
                                                            </Grid>
                                                            <Grid item xs={1}/>
                                                            <Grid item xs={12}>
                                                                {rowData.wastes.map(waste => (
                                                                    <Grid container>
                                                                        <Grid item xs={1}/>
                                                                        <Grid item xs={8}>
                                                                            {waste.nameSupply}
                                                                        </Grid>
                                                                        <Grid item xs={2}>
                                                                            {waste.quantityOrderWaste+" "+waste.nameUnit}
                                                                        </Grid>
                                                                        <Grid item xs={1}/>
                                                                    </Grid>
                                                                ))}
                                                            </Grid>
                                                            </Grid>
                                                        : null}
                                                    </Grid>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={1}/>
                                        </Grid>
                                        <br/>
                                    </div>
                                )
                            }else{
                                return(
                                    <div>
                                        <br/>
                                        <Grid container>
                                            <Grid item xs={5}/>
                                            <Grid item xs={4}>
                                                <h3>No hay insumos registrados</h3>
                                            </Grid>
                                            <Grid item xs={3}/>
                                        </Grid>
                                    </div>
                                )
                            }
                        }
                    }
                        />
                        </Grid>
                        
                    <Fab aria-label="Add" className={classes.fab} color="primary" onClick={this.handleClickNewOrder}>
                        <AddIcon/>
                    </Fab>
                    </Grid>
            );
        }
    }
}

export default OrdersElements;