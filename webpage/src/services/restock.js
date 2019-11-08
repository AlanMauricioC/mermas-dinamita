import React from 'react';
import { SERVER_URL } from "../constants";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import SeeIcon from '@material-ui/icons/Visibility'
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


export const headCells=[
    { 
        title: 'Pedido', 
        field: 'idRestock',
        render: rowData => "#"+rowData.idRestock
    },
    {
        title: 'Estado',
        field: 'statusRestock',
        lookup: { 0: "Cancelado", 1: 'Pendiente', 2: 'Aprobado', 3: "No aprobado", 4: "Pedido",5: "Entregado", 6: "Rechazado"},
    },
    { 
        title: 'Fecha de registro', 
        field: 'registrationDateRestock', 
        type:"date",
        render: rowData => rowData.registrationDateRestock.substring(0, 10)
    },
    { 
        title: 'Total', 
        field: 'total', 
        render: rowData=>  "$"+parseFloat(getTotal(rowData.supplies))
    },
]

const getTotal=(row)=>{
    var a=0;
    row.map(ro => a += ro.costRestockSupply)
    return a;
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
        idRestock: 1, 
        statusRestock: 1, 
        registrationDateRestock: "14/05/1987", 
        total: "$50,000", 
        supplies: details
    },
]

export const getOrderDetail =async function () {
    const asd=[{supply: 1, quantity: 2},{supply: 2, quantity:6}];
    return asd;
}

const sub=(date)=>{
    if(date) return date
    else return "";
    
}

export const headCells3=[
    {
        title: 'Insumo', field: 'idSupply',
        lookup: {1: "Insumo 1", 2:"Insumo 2", 3:"Insumo 3", 4: "Insumo 4", 8: "Insumo 8"}
    },
    {title: 'Cantidad', field: 'quantityRestockSupply', type: "numeric"},
    {title: 'Costo', field: 'costRestockSupply', type: "numeric"},
    {title: 'Proveedor', field: 'idProvider', lookup:{1: "Proveedor 1", 2: "Proveedor 2", 3: "Proveedor 3"}},
    {
        title: 'Estado',
        field: 'statusRestockSupply',
        lookup: { 0: "Cancelado", 1: 'Pendiente', 2: 'Aprobado', 3: "No aprobado", 4: "Pedido",5: "Entregado", 6: "Rechazado"},
    },
    {title: 'Comentarios', field: 'commentaryRestockSupply'},
];


//Cosas que sí funcionan

export const getRestock =async function () {
    try {
        const response = await fetch(`${SERVER_URL}restock`);
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

export const insertRestockSupply = async function (data) {
    try {
        console.log(data);
        const response = await fetch(`${SERVER_URL}insertSupplyRestock`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }else{
            const json = await response.json();
            return json;
        }
        
    } catch (error) {
        console.log(error);
        return []
    }
}

export const updateRestockSupply = async function (data) {
    try {
        console.log(data);
        const response = await fetch(`${SERVER_URL}updateSupplyRestock`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }else{
            const json = await response.json();
            return json;
        }
        
    } catch (error) {
        console.log(error);
        return []
    }
}

export const deleteRestockSupply = async function (data) {
    try {
        console.log(data);
        const response = await fetch(`${SERVER_URL}deleteSupplyRestock`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }else{
            const json = await response.json();
            return json;
        }
        
    } catch (error) {
        console.log(error);
        return []
    }
}

export const setStatusRestock = async function (data) {
    try {
        console.log(data);
        const response = await fetch(`${SERVER_URL}statusRestock`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }else{
            const json = await response.json();
            return json;
        }
        
    } catch (error) {
        console.log(error);
        return []
    }
}

export const createRestock = async function (data) {
    try {
        console.log(data);
        const response = await fetch(`${SERVER_URL}insertRestock`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }else{
            const json = await response.json();
            return json;
        }
        
    } catch (error) {
        console.log(error);
        return []
    }
}

export const getSupplies = async function () {
    let data=[{search: ""}]
    try {
        const response = await fetch(`${SERVER_URL}getSupplies`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }else{
            const json = await response.json();
            return json;
        }
        
    } catch (error) {
        console.log(error);
        return []
    }
}





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
    SeeIcon: forwardRef((props, ref) => <SeeIcon {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


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

export const insertOnlyRestock = async function (data) {
    try {
        console.log(data);
        const response = await fetch(`${SERVER_URL}insertOnlyRestock`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }else{
            const json = await response.json();
            return json;
        }
        
    } catch (error) {
        console.log(error);
        return []
    }
}

export const getRestockRecomendation =async function () {
    try {
        const response = await fetch(`${SERVER_URL}recommendationRestock`);
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