import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableSupplies from './TableSupplies'

function DialogCreate({classes}){

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
                <DialogContent>
                    <TableSupplies />
                </DialogContent>
            </Dialog>
            <Fab aria-label='Add' className={classes.fab} color='primary' onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
        </div>
    );
}

export default DialogCreate;