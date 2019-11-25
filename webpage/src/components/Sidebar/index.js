import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Drawer } from "@material-ui/core";
import ListSidebar from './ListSidebar';
import { menuOpen } from '../../actions'
import {useSelector, useDispatch} from 'react-redux'

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 256,
    },
    imageLogo: {
        margin: "auto",
        marginTop: 10,
        marginBottom: 10,
        width: 130,
        height: 130,
    },
    backgoundGradient:{
        //Y aquí iría un color para el sidebar... Si tuviera uno!
        //Bueno, un rosita para que no quede tan vacío
        //:u eliminado!!!
        backgroundColor: theme.palette.primary.main,
    },
    paper:{
        background: theme.palette.primary.gradient
    }
}));

export default function CenteredGrid() {
    // función para abrir o cerrar  el sidebar
    const dispatch = useDispatch()

    const toggleDrawer = (openBar) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        dispatch(menuOpen(openBar))
    };
  
    const classes = useStyles();
    return (
        <Drawer open={useSelector(state => state.menu.open)} onClose={toggleDrawer(false)}  classes={{ paper: classes.paper }} >
            <Grid container className={classes.root}>
                <Grid item xs={12} className={classes.backgoundGradient}>
                    <Avatar alt="Logo Vivall" src="img/logoHR2.png" className={classes.imageLogo} />
                </Grid>
                <Grid item xs={12} onClick={toggleDrawer(false)} >
                    <ListSidebar />
                </Grid>
            </Grid>
        </Drawer>
    );
}