import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core'
import { getSupplies } from '../../../services/supplies';
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
});

export default class AddWaste extends Component {

    constructor(props) {
        this.super(props)
        this.state = {
            supplies: [],
            open:false,

        }

    }
    

    async componentDidMount() {
        const { supplies } = await getSupplies();

        this.setState({ supplies });
        console.log('supplies', this.state.supplies);
    }

    render() {
        const { handleClose, classes, open } = this.props;

        const handleOnChangeSupply = (event) => this.setState({ selectSupply: event.target.value });

        const handleToggle=e=>{
            this.setState({open:!this.state.open})
        }
        
        
        return (
            <div>
                <Button type="button" color="primary"  className={classes.button} variant="contained" onClick={handleToggle}>
                    Agregar merma
                </Button>
                <Dialog
                    open={open}
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
                            </FormControl>

                            <TextField
                                id="standard-name"
                                label="Cantidad"
                                className={classes.textField}
                                //onChange={handleOnChangeSupply}
                                margin="normal"
                            />
                            <br />
                            <Button type="button" color="primary" className={classes.button} variant="contained" onClick={console.log("algo")}>
                                Agregar
                            </Button>

                           
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleToggle} variant="outlined" color="primary">
                            Cancelar
				</Button>
                        <Button onClick={handleToggle} variant="contained" color="primary">
                            Aceptar
				</Button>
                    </DialogActions>
                </Dialog>
            </div>

        )
    }
}
/*
AddWaste.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddWaste);*/