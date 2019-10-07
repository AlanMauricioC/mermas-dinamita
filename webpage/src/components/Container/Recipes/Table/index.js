import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { headCells, data } from '../../../../services/recipes'
import { localization, tableIcons } from '../../../../services/orders'
import DialogRecipe from './Dialog'


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

    
    handleClose = () => {
        this.setState({
            open:false,
            row: "",
        });
    };

    render() {
        return (
            <div>
                <MaterialTable
                    title="Recetas"
                    columns={this.state.columns}
                    data={this.state.data}
                    localization={localization}
                    icons={tableIcons}
                    options={{
                    actionsColumnIndex: -1
                    }}
                    actions={[
                        {
                            icon: "0",
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
                <DialogRecipe open={this.state.open} handleClose={this.handleClose}/>
            </div>
           
        )
        }
}

export default Table;