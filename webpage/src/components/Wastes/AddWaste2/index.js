import React, { Component, useState }from 'react'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core'
import { getSupplies } from '../../../services/supplies';
import 'date-fns';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { insertWaste} from '../../../services/wastes';
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
        width: 400,
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

class AddWaste extends Component {

    constructor(props) {
        super(props)
        const date = moment.now();
        this.state = {
            supplies: [],
            quantity:0,
            type:'',
            date,
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

        const handleOnChangeType = (event) => this.setState({ type: event.target.value });

        const handleOnChangeQuantity = (event) => this.setState({quantity:event.target.value});
        
        const handleOnChangeDate = date => {
            let value = moment(date).format('YYYY-MM-DD');
            this.setState({ date: value});
          };
        
        
        const handleToggle=e=>{
            this.setState({open:!this.state.open})
            console.log(this.state.open);
            
        }
        const sendData=e=>{
            var datos = { 
                'id':this.state.selectSupply,
                'quantity':this.state.quantity,
                'type':this.state.type,
                'idUser':1,
                'sellByDate' : this.state.date,
                
            };
            
            insertWaste(datos);
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
                    <DialogTitle id="form-dialog-title" className={classes.top}>Agregar merma</DialogTitle>
                    <DialogContent>
                        <div className={classes.paper}>
                            
                            
                            <Grid container spacing={1}>
                                <Grid container item xs={12}>
                                <FormControl className={classes.select} required>
                                    <InputLabel shrink htmlFor="idSelectWaste">
                                        Selecciona un insumo
                                    </InputLabel>
                                    <Select
                                        displayEmpty
                                        className={classes.textField}
                                        name="selectSupply"
                                        id="idSelectWaste"
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
                                    </FormControl>
                                </Grid>
                                <Grid container item xs={12}>
                                    <FormControl className={classes.select} required>
                                        <InputLabel shrink htmlFor="idSelectType">
                                            Selecciona un tipo de merma
                                        </InputLabel>
                                        <Select 
                                            displayEmpty
                                            className={classes.textField}
                                            name="selectType"
                                            id="idSelectType"
                                            onChange={handleOnChangeType}
                                            value={this.state.type}
                                            displayEmpty>
                                            <MenuItem value={-1}>
                                                <em>Ninguno</em>
                                            </MenuItem>
                                            <MenuItem id={1} value={1}>
                                                Reutilizable
                                            </MenuItem>
                                            <MenuItem id={2} value={2}>
                                                Devolución
                                            </MenuItem>
                                            <MenuItem id={3} value={3}>
                                                Accidental
                                            </MenuItem>
                                            <MenuItem id={4} value={4}>
                                                Comida del personal
                                            </MenuItem>
                                            <MenuItem id={5} value={5}>
                                                Caduco
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    
                                </Grid>
                                <Grid container item xs={12}>
                                    
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            label="Fecha de caducidad"
                                            format="dd/MM/yyyy"
                                            autoOk={true}
                                            onChange={handleOnChangeDate}
                                            value={this.state.date}
                                            
                                            KeyboardButtonProps={{
                                                'aria-label': 'Fecha de caducidad'
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid container item xs={12}>
                                    <TextField
                                        id="standard-name"
                                        label="Cantidad"
                                        className={classes.textField}
                                        onChange={handleOnChangeQuantity}
                                        margin="normal"
                                    />
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
export default withStyles(styles)(AddWaste);
/*
AddWaste.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddWaste);*/