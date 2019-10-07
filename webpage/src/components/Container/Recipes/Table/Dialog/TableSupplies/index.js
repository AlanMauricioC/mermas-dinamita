import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { headCells2, data2 } from '../../../../../../services/recipes'
import { localization, tableIcons } from '../../../../../../services/orders'


class TableSupplies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: headCells2,
            data: data2,
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
            </div>
           
        )
        }
}

export default TableSupplies;