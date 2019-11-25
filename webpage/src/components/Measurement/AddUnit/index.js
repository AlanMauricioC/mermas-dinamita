import React, { Component, useState }from 'react'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core'
import { insertUnit} from '../../../services/units';
import Table from "../index";
import withStyles from '@material-ui/core/styles/withStyles'


const styles = theme => ({
    paper: {
        /*position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),*/
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
    },
    select: {
        width: '100%',
    },
    button: {
		margin: theme.spacing.unit,
		width: '100%'
    },
    top: {
		backgroundColor: theme.palette.primary.main,
		color: 'white'
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
});

class AddUnit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name:'',      
            open:false,
        }

    }

    render() {
        const { handleClose, classes, open} = this.props;
        const handleOnChangeName = (event) => this.setState({name:event.target.value});
        const handleToggle=e=>{
            this.setState({open:!this.state.open})
            console.log(this.state.open);
        }

        const sendData=e=>{
            var datos = { 
                'name':this.state.name,
            };
            insertUnit(datos).then(()=>this.props.updateUnit(datos));

            this.setState({open:false});
            
        }
        
        return (
            <div>
                
                <Fab aria-label="Add" className={classes.fab} color="primary" onClick={handleToggle}>
                    <AddIcon />
                </Fab>
                <Dialog
                    open={this.state.open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                    maxWidth={'md'}
                >
                    <DialogTitle id="form-dialog-title" className={classes.top}>Agregar unidad</DialogTitle>
                    <DialogContent>
                        <div className={classes.paper}>
                            <Grid container spacing={1}>
                                <Grid container item xs={12}>
                                <FormControl className={classes.select} required>
                                    <InputLabel shrink htmlFor="idSelectWaste">
                                        Escribe el nombre de la unidad de medida
                                    </InputLabel>
                                    <TextField
                                        id="standard-name"
                                        
                                        className={classes.textField}
                                        onChange={handleOnChangeName}
                                        margin="normal"
                                    />
                                    </FormControl>
                                </Grid>
                            </Grid>                    
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleToggle} variant="outlined" color="primary">
                            Cancelar
				        </Button>
                        <Button onClick={sendData} variant="contained" color="primary">
                            Aceptar
				        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default withStyles(styles)(AddUnit);
