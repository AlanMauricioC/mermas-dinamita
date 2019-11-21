import React from 'react';
import MaterialTable from 'material-table';
import TableOrderDetail from './TableOrderDetail';
import { Fab, Grid, Paper, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { getOrders } from './../../../../services/orders';
import { tableIcons, localization } from './../../../../services/restock';
import alertifyjs from "alertifyjs";

class OrdersElements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: null,
            idOrder: null,
            orderDetail: null,
            idRecipe: null, 
            columns: [
                { title: 'Número de orden', field: 'idOrder'},
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
                <div>
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
                                                        </Grid>
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
                            
                        }}
                    />
                    <Fab aria-label="Add" className={classes.fab} color="primary" onClick={this.handleClickNewOrder}>
                        <AddIcon/>
                    </Fab>
                </div>
            );
        }
    }
}

export default OrdersElements;