import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableSupplies from './TableSupplies'

function DialogRecipe({open, handleClose, row}){
    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={open}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
            >
                <DialogContent>
                    <TableSupplies/>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
            
        </div>
    );
}

export default DialogRecipe;