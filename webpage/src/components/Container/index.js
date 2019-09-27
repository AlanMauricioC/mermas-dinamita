import React from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        padding: 20,
    },
}));

const selectContent=(menuItem)=>{

    switch(menuItem){
        default:
            return <h6>Holi</h6>
    }
}

//dependiendo del menuItem mostrar un contenido diferente
const Container = ({ menuItem})=>{
    const classes = useStyles();
    return <Grid container direction="row" className={classes.root}>
        {selectContent(menuItem)}
    </Grid>
}



export default Container