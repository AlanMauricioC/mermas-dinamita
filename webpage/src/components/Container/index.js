import React from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import { Switch, Route } from "react-router-dom";
import Supplies from "./Supplies";
import 'alertifyjs/build/css/alertify.min.css'
import 'alertifyjs/build/css/themes/default.css'
import Charts from "./Charts";
import Wastes from "../Wastes";
import Orders from "./Orders";
import Recipes from "./Recipes";
import OrdersT from "./OrdersT";
import Users from "../Users";
import Login from "../Login";
import Measurement from "../Measurement";
import Restock from './Restock';
import { getSupplies } from "../../services/supplies";
import { useDispatch} from "react-redux";
import {setSupplies} from '../../actions'
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
    const dispatch=useDispatch()
    getSupplies('',null).then((suppliesData)=>{
        dispatch(setSupplies(suppliesData.supplies))
    })

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
            <Route exact path="/mermas">
                <Wastes/>
            </Route>
            <Route exact path="/unidades">
                <Measurement/>
            </Route>
            <Route exact path="/pedidos">
                <Orders/>
            </Route>
            <Route exact path="/nuevoPedido">
                <Restock/>
            </Route>
            <Route exact path="/graficas">
                <Charts/>
            </Route>
            <Route exact path="/usuarios">
                <Users/>
            </Route>
            <Route exact path="/login">
                <Login/>
            </Route>

        </Switch>
    </Grid>
}

export default Container