import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { getUnits, deleteUnit,updateUnit,insertUnit, tableIcons, headCells,data} from '../../services/units';



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
    getUnits().then(({units}) => {
        this.setState({ data: units })
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
  render(){
    return (
      <div style={{ minWidth: "100%" }}>
          
          <MaterialTable
              title="Unidades de medida"
              columns={this.state.columns}
              data={this.state.data}
              icons={tableIcons}
              editable={{
                onRowAdd: newData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            const data = this.state.data;
                            data.push(newData);
                            var unidad = {'name':newData.name};

                            insertUnit(unidad);
                            this.setState({ data }, () => resolve());
                        }
                        resolve();
                    }, 1000);
                }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        const data = this.state.data;
                        const index = data.indexOf(oldData);
                        data[index] = newData;
                        var datos = { 'id' : oldData.id,
                          'name':newData.name
                        };
                        updateUnit(datos);
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
                        console.log("id"+oldData.id);
                        var dato = { 'id' : oldData.id};
                        deleteUnit(dato);
                        data.splice(index, 1);
                        this.setState({ data }, () => resolve());
                      }
                      resolve()
                    }, 1000)
                  }),
              }}
              options={{
                actionsColumnIndex: -1
              }}
              />
      </div>
      
    );
  }
}

export default Table;