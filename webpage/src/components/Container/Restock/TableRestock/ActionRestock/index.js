import React from 'react';
import NewRestock from './NewRestock';
import { makeStyles } from '@material-ui/core/styles';

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
        boxShadow: '5px 4px 18px -2px rgba(0,0,0,0.75)',
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
}));

export default function ActionRestock(props){
    const classes = useStyles();

    switch(props.action){
        case "add":
            return <NewRestock classes={classes} changeEditState={props.changeEditState}/>
        case "edit":
            return <div>Holo</div>
    }
}