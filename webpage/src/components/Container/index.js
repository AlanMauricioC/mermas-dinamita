import React from 'react';
import { Grid } from "@material-ui/core";
import DataTable from "../DataTable";
import { makeStyles } from '@material-ui/styles';
import { Switch, Route } from "react-router-dom";
import Supplies from "./Supplies";

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
                recetas
            </Route>
            <Route exact path="/ordenes">
                {/* no estoy seguro de se este si va aquí .3. pero pos ya */}
                <DataTable />
            </Route>
            <Route exact path="/reportes">
                reportes
            </Route>
            <Route exact path="/pedidos">
                pedidos
            </Route>
            <Route>
                404 :c Not Found
            </Route>

        </Switch>
    </Grid>
}

export default Container