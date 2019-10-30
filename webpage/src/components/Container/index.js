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
import Orders from "./Orders";
import Recipes from "./Recipes";
import OrdersT from "./OrdersT";
import Measurement from "../Measurement";


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
                <Supplies/>
            </Route>
            <Route exact path="/insumos">
                <Supplies/>
            </Route>
            <Route exact path="/recetas">
                <Recipes/>
            </Route>
            <Route exact path="/ordenes">
                <OrdersT />
            </Route>
            <Route exact path="/reportes">
                <Wastes/>
            </Route>
            <Route exact path="/unidades">
                <Measurement/>
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