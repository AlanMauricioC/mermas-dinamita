import React, { Component } from 'react';
import { Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Table from './Table';
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
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
}));

export default function Recipes(){
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    {/*Pedidos*/}
                </Grid>
                <Grid item xs={12}>
                    <Table classes={classes}/>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </div>
    );

}