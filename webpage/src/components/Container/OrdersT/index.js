import React, { Component } from 'react';
import { Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import OrdersElements from './OrdersElements';
//Este no debería ser orders, debería ser restock pero ya es muy noche u.u
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
}));

export default function OrdersT(){
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    {/*Pedidos*/}
                </Grid>
                <Grid item xs={12}>
                    <OrdersElements classes={classes}/>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </div>
    );

}