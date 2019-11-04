import React, { Component } from 'react';
import { Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import TableRestock from './TableRestock';

//Este no debería ser orders, debería ser restock pero ya es muy noche u.u
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        //backgroundColor: theme.palette.background.paper,
        //width: 500,
        //position: 'relative',
        //minHeight: 200,
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
}));

export default function Restock(){
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    {/*Pedidos*/}
                </Grid>
                <Grid item xs={12}>
                    <TableRestock classes={classes}/>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </div>
    );

}