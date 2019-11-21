import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { getUsers, deleteUser,updateUser,insertUser, tableIcons, headCells,data} from '../../services/users';
import AddUser from "./AddUser";


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
    const usuarios = await getUsers();
    this.setState({ data: usuarios.users});
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
          <AddUser></AddUser>
          <MaterialTable
              title="Usuarios"
              columns={this.state.columns}
              data={this.state.data}
              icons={tableIcons}
              editable={{
                
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        const data = this.state.data;
                        const index = data.indexOf(oldData);
                        data[index] = newData;
                        var datos = { 'id' : oldData.id,
                          'email':newData.email,
                          'rol':newData.rol,
                          'pin':newData.pin
                        };
                        updateUser(datos);
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
                        deleteUser(dato);
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