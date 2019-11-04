import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Grid, Fab, useTheme, makeStyles } from '@material-ui/core';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableSupplies from './TableSupplies'

function DialogCreate({classes, change}){

    const theme = useTheme();
    const useStyles = makeStyles({
		top: {
			backgroundColor: theme.palette.primary.main,
			color: 'white'
		},
        fab: {
          position: 'absolute',
          bottom: theme.spacing(2),
          right: theme.spacing(2),
        },
	})
    const classes2 = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth="xl"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className={classes2.top}>
                    Nuevo pedido
                </DialogTitle>
                <DialogContent>
                    <TableSupplies change={change} handleClose={handleClose}/>
                </DialogContent>
            </Dialog>
            <Link to={"/nuevoPedido"}>
                <Fab aria-label='Add' className={classes2.fab} color='primary'>
                    <AddIcon />
                </Fab>
            </Link>
        </div>
    );
}

export default DialogCreate;