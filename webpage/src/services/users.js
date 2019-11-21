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
    { title: 'Nombre del insumo', field: 'nameSupply' },
    { title: 'Fecha', field: 'registrationDateWaste', type: 'datetime',editable: 'never'},
    { title: 'Fecha de caducidad', field: 'sellByDateWaste', type: 'datetime',editable: 'never' },
    { title: 'Cantidad', field: 'quantityWaste', type:'double'},
    { title: 'Tipo de merma', field: 'typeWaste', type:'double',lookup:{1:'reutilizable',2:'devolución',3:'accidente',4:'comida del personal',5:'caduco'}, editable:'never'},
    { title: 'Nombre del empleado', field: 'idUser',editable: 'never'},    
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
    
]


export const insertWaste = async function (waste) {
    try {
        console.log(waste);
        const response = await fetch(SERVER_URL +`insertWaste`,{
            method: 'POST',
            body: JSON.stringify(waste),
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

export const getWastes =async function () {
    try {
        const response = await fetch(SERVER_URL +`getWastes`,{
            method: 'POST',
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

export const deleteWaste = async function(waste){
    try {
        const response = await fetch(SERVER_URL +`deleteWaste`,{
            method: 'POST',
            body: JSON.stringify(waste),
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

export const updateWaste = async function(data){
    try {
        const response = await fetch(SERVER_URL +`updateWaste`,{
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