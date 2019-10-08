import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ExitIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import { Grid, AppBar, Toolbar } from "@material-ui/core";
import { menuOpen } from '../../actions'
import {  useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        paddingRight: 10,
    },
    bigAvatar: {
        width: 40,
        height: 40,
        padding: '0.5em'
    },
    navBar: {
        //Aquí iría un color para el navbar... Si tuviera uno!
    }
}));

export default function Navbar() {

    const classes = useStyles();
    const dispatch=useDispatch()
    const toggleMenu=()=>{
        dispatch(menuOpen(true))
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.navBar}>
                <Toolbar>
                    <MenuIcon onClick={toggleMenu}></MenuIcon>
                    <Grid container justify="flex-end" alignItems="center">
                        <Avatar alt="Image profile" src="logo192.png" className={classes.bigAvatar} />
                        <Typography variant="h6" className={classes.title}>
                            Juanito Banana
                        </Typography>
                        <ExitIcon />
                    </Grid>
                </Toolbar>
            </AppBar>

        </div>
    )
};
