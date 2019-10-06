import React from 'react';
import { Grid } from "@material-ui/core";
import DataTable from "../DataTable";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        padding: 20,
    },
    color:{
        backgroundColor:"red"
    }
}));

const selectContent=(menuItem)=>{

    switch(menuItem){
        default://Aquí va la página de verdad
            return <DataTable/>
    }
}

//dependiendo del menuItem mostrar un contenido diferente
const Container = ({ menuItem})=>{
    const classes = useStyles();
    return <Grid container direction="row" className={ classes.root,classes.color}>
        {selectContent(menuItem)}
    </Grid>
}

export default Container