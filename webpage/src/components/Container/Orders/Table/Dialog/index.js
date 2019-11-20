import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableSupplies from './TableSupplies'
import { makeStyles,useTheme } from '@material-ui/core';

function AlertDialog({open, handleClose, row, change}){
    const theme = useTheme();
    const useStyles = makeStyles({
		top: {
			backgroundColor: theme.palette.primary.main,
			color: 'white'
		}
	})
    const classes = useStyles();
    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
            >
                <DialogTitle className={classes.top}>
                    Modificar pedido
                </DialogTitle>
                <DialogContent>
                    <TableSupplies row={row} change={change} handleClose={handleClose}/>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog;