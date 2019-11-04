import React, {Component} from 'react';
import MaterialTable from 'material-table';
import ActionRestock from './ActionRestock';
import { Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {getRestock} from './../../../../services/restock';

class TableRestock extends Component {
    constructor(props){
        super(props);
        this.state={
            edit: true,
            isNew: false,
            data: [],
            columns: 
                [
                    { title: 'Número de pedido', field: 'idRestock' },
                    { title: 'Fecha de registro', field: 'registrationDateRestock', type: "datetime" },
                    { title: 'Total', field: 'totalCost' },
                    { title: 'Registrado por', field: 'nameUser' },
                    {
                        title: 'Status',
                        field: 'statusRestock',
                        lookup: { 0: "Cancelado", 1: "Pendiente", 2: "Aprobado", 3: "No aprobado", 4: "Pedido", 5: "Entregado", 6: "Rechazado" },
                    },
                ]
            
        }
    }

    componentDidMount(){
        this.getData();
    }

    async getData() {
        getRestock().then(({ restock }) => {
            this.setState({ data: restock })
            console.log('Restock: \n',restock);
          })
    }

    changeEditState=(isNew)=>{
        if(this.state.edit) this.setState({edit: false, isNew});
        else this.setState({edit: true});
    }

    render() {
        const {classes}=this.props;
        if(this.state.edit) return (<ActionRestock changeEditState={this.changeEditState} isNew={this.state.isNew} classes={classes}/>);
        else return (
            <div>
                <MaterialTable
                    title="Pedidos"
                    columns={this.state.columns}
                    data={this.state.data}
                    actions={[
                    {
                        icon: 'save',
                        tooltip: 'Save User',
                        onClick: (event, rowData) => this.changeEditState(false)
                    },
                    rowData => ({
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => alert("You want to delete " + rowData.name),
                        disabled: rowData.birthYear < 2000
                    })
                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
                <Fab aria-label="Add" className={classes.fab} color="primary" onClick={()=>this.changeEditState(true)}>
                    <AddIcon />
                </Fab>
            </div>
        )
    }
}

export default TableRestock;