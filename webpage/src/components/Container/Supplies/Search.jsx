import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { setSupplies } from "../../../actions";
import { useDispatch } from "react-redux";
import { getSupplies } from "../../../services/supplies";

const useStyles = makeStyles(theme => ({
    root: {
        width:'100%',
        display: 'flex',
        alignItems: 'center',
        marginLeft: 12
    },
    input: {
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));

export default function CustomizedInputBase() {
    const classes = useStyles();
    const dispatch=useDispatch()
    const handleOnChangeSearch=e=>{
        const inputValue = e.target.value
        console.log('estoy buscando :u', inputValue);
        getSupplies(inputValue, null).then(({ supplies }) => dispatch(setSupplies(supplies)))
        
    }
    return (
        <Paper className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder="Buscar insumos"
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={handleOnChangeSearch}
            />
        </Paper>
    );
}