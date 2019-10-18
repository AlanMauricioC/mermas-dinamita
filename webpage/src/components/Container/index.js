import React from 'react';
import { Grid } from "@material-ui/core";
import DataTable from "../DataTable";
import { makeStyles } from '@material-ui/styles';
import { Switch, Route } from "react-router-dom";
import Supplies from "./Supplies";
import 'alertifyjs/build/css/alertify.min.css'
import 'alertifyjs/build/css/themes/default.css'
import Table from "../Table";
import Wastes from "../Wastes";
import Orders from "./Orders"
import Recipes from "./Recipes"

const useStyles = makeStyles(theme => ({
    root: {
        padding: 20,
    },
    color:{
        backgroundColor:"red"
    }
}));

//dependiendo del menuItem mostrar un contenido diferente
const Container = ()=>{
    const classes = useStyles();
    return <Grid container direction="row" className={classes.root}>
        <Switch>
            <Route exact path="/">
                {/* home page */}
                <DataTable />
            </Route>
            <Route exact path="/insumos">
                <Supplies/>
            </Route>
            <Route exact path="/recetas">
                <Recipes/>
            </Route>
            <Route exact path="/ordenes">
                {/* no estoy seguro de se este si va aquí .3. pero pos ya */}
                <DataTable />
            </Route>
            <Route exact path="/reportes">
                <Wastes/>
            </Route>
            <Route exact path="/pedidos">
                <Orders/>
            </Route>
            <Route>
                
            </Route>

        </Switch>
    </Grid>
}

export default Container