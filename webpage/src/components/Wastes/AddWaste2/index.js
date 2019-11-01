import React, { Component, useState }from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core'
import { getSupplies } from '../../../services/supplies';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker,} from '@material-ui/pickers';
import { insertWaste} from '../../../services/wastes';
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
        width: 300,
    },
    button: {
		margin: theme.spacing.unit,
		width: '100%'
    },
    top: {
		backgroundColor: theme.palette.primary.main,
		color: 'white'
	},
});

class AddWaste extends Component {

    constructor(props) {
        super(props)
        this.state = {
            supplies: [],
            quantity:0,
            date:'2019-10-24T10:30',
            open:false,
        }

    }

    async componentDidMount() {
        const { supplies } = await getSupplies();

        this.setState({ supplies });
        console.log('supplies', this.state.supplies);
    }

    render() {

        const { handleClose, classes, open} = this.props;


        const handleOnChangeSupply = (event) => this.setState({ selectSupply: event.target.value });

        const handleOnChangeQuantity = (event) => this.setState({quantity:event.target.value});
        const handleOnChangeDate = (event) => this.setState({date:event.target.value});

        const handleToggle=e=>{
            this.setState({open:!this.state.open})
            console.log(this.state.open);
            
        }
        const sendData=e=>{
            var datos = { 
                'id':this.state.selectSupply,
                'quantity':this.state.quantity,
                'idUser':1,
                'sellByDate' : this.state.date,
                
            };
            
            insertWaste(datos);
            this.setState({open:false});
        }
        
        return (
            <div>
                <Button type="button" color="primary" variant="contained" onClick={handleToggle}>
                    Agregar merma
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                    maxWidth={'md'}
                >
                    <DialogTitle id="form-dialog-title" className={classes.top}>Eliminar Insumo</DialogTitle>
                    <DialogContent>
                        <div className={classes.paper}>
                            <h3 id="simple-modal-title">Añadir una nueva merma</h3>
                            <FormControl className={classes.select} required>
                                <InputLabel shrink htmlFor="idSelectUnit">
                                    Agregar un insumo
								</InputLabel>
                                <Select
                                    displayEmpty
                                    className={classes.textField}
                                    name="selectSupply"
                                    onChange={handleOnChangeSupply}
                                    value={this.state.selectSupply}
                                    displayEmpty
                                >
                                    <MenuItem value={-1}>
                                        <em>Ninguno</em>
                                    </MenuItem>
                                    {this.state.supplies.map(({ id, name }) => (
                                        <MenuItem key={id} value={id}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <br/>
                                <TextField
                                    id="datetime-local"
                                    label="Fecha de caducidad"
                                    type="datetime-local"
                                    defaultValue="2019-10-24T10:30"
                                    className={classes.textField}
                                    onChange={handleOnChangeDate}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                                <TextField
                                    id="standard-name"
                                    label="Cantidad"
                                    className={classes.textField}
                                    onChange={handleOnChangeQuantity}
                                    margin="normal"
                                />
                            </FormControl>
                            <br />
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
export default withStyles(styles)(AddWaste);
/*
AddWaste.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddWaste);*/