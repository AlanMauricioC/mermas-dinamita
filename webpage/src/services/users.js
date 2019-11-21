import React, { Component } from 'react';
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
import { SERVER_URL } from "../constants";

export const tableIcons = {
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

export const headCells = 
[
    { title: 'Nombre del empleado', field: 'name' },
    { title: 'Rol del empleado', field: 'rol' },
    { title: 'Pin de seguridad', field: 'pin', type:'numeric'}
      
]


export const localization={
    pagination: {
        labelDisplayedRows: '{from}-{to} of {count}'
    },
    toolbar: {
        nRowsSelected: '{0} row(s) selected',
        searchTooltip: "Buscar",
        searchPlaceholder: "Buscar"
    },
    header: {
        actions: 'Acciones'
    },
    body: {
        emptyDataSourceMessage: 'No records to display',
        filterRow: {
            filterTooltip: 'Filter'
        },
        editRow: {
            deleteText: "¿Está seguro que desea eliminar este registro?",
            cancelTooltip: "Cancelar",
            saveTooltip: "Guardar"
        },
        addTooltip: "Agregar",
        deleteTooltip: "Borrar",
        editTooltip: "Editar"
    }
}
const details=[
    {
        idSupply: 1, 
        nameSupply: "Insumo 1", 
        quantityRestockSupply: 50, 
        costRestockSupply: "$10,000", 
        arrivalDateRestockSupply:"30/10/1997", 
        sellByDateRestockSupply:"09/07/2003", 
        idProvider:1, nameProvider: "Juan Pérez", 
        statusRestockSupply: 1
    }
]
export const data=[
    {
        id: 0,
        name: 'Aldo', 
        rol: "Admin", 
        pin: 1233, 
    }
]


export const insertUser = async function (user) {
    try {
        console.log(user);
        const response = await fetch(SERVER_URL +`insertUser`,{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);

        return json;
    } catch (error) {
        console.log(error);
        return []
    }
}

export const getUsers =async function () {
    try {
        const response = await fetch(SERVER_URL +`users`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);

        return json;
    } catch (error) {
        console.log(error);
        return null
    }
}

export const deleteUser = async function(user){
    try {
        const response = await fetch(SERVER_URL +`deleteUser`,{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);

        return json;
    } catch (error) {
        console.log(error);
        return []
    }
}

export const updateUser = async function(data){
    try {
        const response = await fetch(SERVER_URL +`updateUser`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);

        return json;
    } catch (error) {
        console.log(error);
        return []
    }
}