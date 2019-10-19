import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { SERVER_URL } from "../../constants";
import DatePicker from './DatePicker';


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function MaterialTableDemo() {
  /*
  url += 'per_page=' + query.pageSize
                url += '&page=' + (query.page + 1)
                {title: 'Estado', field: 'statusWaste', lookup: { 1: 'Activo', 0: 'Inactivo' }},
  */
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nombre del insumo', field: 'nameSupply' },
      { title: 'Fecha', field: 'registrationDateWaste', type: 'date' },
      { title: 'Fecha de caducidad', field: 'sellByDate', type: 'date' },
      { title: 'Cantidad', field: 'quantityWaste', type:'double'},
      { title: 'Nombre del empleado', field: 'idUser' },
      
    ],
    data: [
      { nombre: 'Tomates', fecha: '8/10/2019',quantityWaste:10, empleado:'Omar', estado: 1 },
      {
        nombre: 'Papas',
        cantidad:30,
        fecha: '8/10/2019',
        empleado:'Martha',
        estado: 0,
      },
    ],
  });


  return (
    <div style={{ minWidth: "100%" }}>
      
        <MaterialTable
            title="Mermas"
            columns={state.columns}
            //data={state.data}
            
            data={query =>
              new Promise((resolve, reject) => {
                let url = SERVER_URL +`getWastes`
                fetch(url,{
                  method: 'POST',
                  headers: {'Content-Type': 'application/json',
                  }})
                  .then(response => response.json())
                  .then(result => {
                    state.data = result.wastes;
                    resolve({
                      
                      data: state.data,
                      //page: result.page - 1,
                      //totalCount: result.total,
                    })
                  })
              })
            }
            icons={tableIcons}
            editable={{
                onRowAdd: newData =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    const data = [...state.data];
                    data.push(newData);
                    setState({ ...state, data });
                    let url = SERVER_URL +`insertWaste`;
                    console.log(newData);
                    //req.body.id, req.body.quantity, req.body.idUser, req.body.sellByDate
                    /*var datos = { 'id' : newData.idSupply,
                      'quantity':newData.quantityWaste,
                      'sellByDate' : newData.sellByDate
                    };
                    fetch(url,{
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'
                      },
                      body : JSON.stringify(datos),
                    })
                    .then(response => response.json())
                      .then(result => {
                        console.log("Registrado");
                    })*/

                    }, 600);
                }),
                onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    const data = [...state.data];
                    data[data.indexOf(oldData)] = newData;
                    setState({ ...state, data });
                    let url = SERVER_URL +`updateWaste`;
                    //req.body.quantity, req.body.idUser, req.body.sellByDate, req.body.id
                    var datos = { 'id' : oldData.idWaste,
                      'quantity':newData.quantityWaste,
                      'sellByDate' : newData.sellByDate,
                      'idUser':newData.idUser
                    };
                    fetch(url,{
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'
                      },
                      body : JSON.stringify(datos),
                    })
                    .then(response => response.json())
                      .then(result => {
                        console.log("Registro Actualizado");
                    })

                    }, 600);
                }),
                onRowDelete: oldData =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    const data = [...state.data];
                    data.splice(data.indexOf(oldData), 1);
                    setState({ ...state, data });
                    var dato = { 'id' : oldData.idWaste};
                    let url = SERVER_URL +`deleteWaste`
                    fetch(url,{
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'
                      },
                      body : JSON.stringify(dato),
                    })
                      .then(response => response.json())
                      .then(result => {
                        console.log("HEcho");
                        })
                    
                    }, 600);
                }),
            }}
            />
    </div>
    
  );
}