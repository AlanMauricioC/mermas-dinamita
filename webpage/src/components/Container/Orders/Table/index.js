import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { tableIcons, headCells, data, getOrderDetail, getRestock, localization } from './../../../../services/restock'
import AlertDialog from './Dialog';
import WatchIcon from '@material-ui/icons/RemoveRedEye'
import DialogCreate from '../DialogCreate';


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: headCells,
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

    componentDidMount() {
        this.getData();
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