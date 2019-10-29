import React, { Component } from 'react';
import MaterialTable from 'material-table';
import AddWaste2 from "./AddWaste2";
import { getWastes, insertWaste, updateWaste, deleteWaste, tableIcons, headCells,data} from '../../services/wastes';



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
    getWastes().then(({ wastes }) => {
        console.log('CategoryListSidebar',wastes);
        this.setState({ data: wastes })
        console.log('CategoryListSidebar',wastes);
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
          <AddWaste2></AddWaste2>
          <br/>
          <MaterialTable
              title="Mermas"
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
                        var datos = { 'id' : oldData.idWaste,
                          'quantity':newData.quantityWaste,
                          'sellByDate' : newData.sellByDate,
                          'idUser':newData.idUser
                        };
                        updateWaste(datos);
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
                        console.log("id"+oldData.idWaste);
                        var datos = { 'id' : oldData.idWaste};
                        deleteWaste(datos);
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