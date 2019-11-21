import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { tableIcons, data, getOrderDetail, getRestock, localization } from './../../../../services/restock'
import AlertDialog from './Dialog';
import WatchIcon from '@material-ui/icons/RemoveRedEye'
import DialogCreate from '../DialogCreate';


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: data,
            row: "",
            open: false,
        }
    }

    async getData() {
        getRestock().then(({ restock }) => {
            console.log('CategoryListSidebar',restock);
            this.setState({ data: restock })
            console.log('CategoryListSidebar',restock);
          })
    }

    getHeadCells=()=>{
        const headCells=[
            { 
                title: 'Pedido', 
                field: 'idRestock',
                render: rowData => "#"+rowData.idRestock
            },
            {
                title: 'Estado',
                field: 'statusRestock',
                lookup: { 0: "Cancelado", 1: 'Pendiente', 2: 'Aprobado', 3: "No aprobado", 4: "Pedido",5: "Entregado", 6: "Rechazado"},
            },
            { 
                title: 'Fecha de registro', 
                field: 'registrationDateRestock', 
                type:"date",
                render: rowData => rowData.registrationDateRestock.substring(0, 10)
            },
            { 
                title: 'Total', 
                field: 'total', 
                render: rowData=>  "$"+parseFloat(getTotal(rowData.supplies))
            },
            { 
                title: 'Generado por', 
                field: 'emailUser', 
            },
        ]
        
        const getTotal=(row)=>{
            var a=0;
            row.map(ro => a += ro.costRestockSupply)
            return a;
        }

        this.setState({columns: headCells})
        this.getData();
    }

    componentDidMount() {
        this.getHeadCells();
    }

    componentDidUpdate(prevProp,prevState) {
        console.log(prevState);
        if (prevState.rows===this.state.rows) {
            return null
        }
        
        this.getData();
    }
    
    handleClose = () => {
        this.setState({
            open:false,
            row: "",
        });
    };

    change=()=>{
        this.getData();
    }

    handleOpenCreate = () => {
        this.setState({open:true})
    };

    render() {
        console.log(this.state.data)
        const {classes}=this.props;
        return (
            <div>
                <MaterialTable
                    title="Pedidos"
                    columns={this.state.columns}
                    data={this.state.data}
                    icons={tableIcons}
                    localization={localization}
                    options={{
                        actionsColumnIndex: -1
                    }}
                    actions={[
                    {
                        icon: tableIcons.SeeIcon,
                        tooltip: 'Ver detalles de pedido',
                        onClick: (event, rowData) => {
                            this.setState({
                                open: true,
                                row:rowData,
                            });
                            console.log(this.state.row)
                        }
                    }
                    ]}
                    editable={{
                    }}
                />
                <AlertDialog open={this.state.open} handleClose={this.handleClose} change={this.change} row={this.state.row}/>
                <DialogCreate change={this.change}/>
            </div>
        )
    }
}

export default Table;