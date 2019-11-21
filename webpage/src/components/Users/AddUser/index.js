import React, { Component, useState }from 'react'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core'
import { getSupplies } from '../../../services/supplies';
import 'date-fns';
import { insertUser} from '../../../services/users';
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
        this.state = {
            supplies: [],
            pin:0,
            type:'',
            pass:'',
            cpass:'',
            rol:'',
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


        const handleOnChangeEmail = (event) => this.setState({ email: event.target.value });
        const handleOnChangeType = (event) => this.setState({ rol: event.target.value });
        const handleOnChangeConfirmPass = (event) => this.setState({cpass:event.target.value});

        const handleOnChangePin = (event) => this.setState({pin:event.target.value});
        const handleOnChangePass = (event) => this.setState({pass:event.target.value});

        const handleToggle=e=>{
            this.setState({open:!this.state.open})
            console.log(this.state.open);
            
        }
        const sendData=e=>{
          if(this.state.pass == this.state.cpass && this.state.pin.length==4){
            var datos = { 
              'email':this.state.email,
              'pin':this.state.pin,
              'password':this.state.pass,
              'rol' :this.state.rol
            };
            
            insertUser(datos);
          }
            
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
                    <DialogTitle id="form-dialog-title" className={classes.top}>Agregar un nuevo usuario</DialogTitle>
                    <DialogContent>
                        <div className={classes.paper}>
                            
                            
                            <Grid container spacing={1}>
                                <Grid container item xs={12}>
                                <FormControl className={classes.select} required>
                                    <InputLabel shrink htmlFor="idEmail">
                                        ingresa un correo
                                    </InputLabel>
                                    <TextField
                                        id="idEmail"
                                        className={classes.textField}
                                        onChange={handleOnChangeEmail}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                    </FormControl>
                                </Grid>
                                <Grid container item xs={12}>
                                <FormControl className={classes.select} required>
                                  <InputLabel shrink htmlFor="idSelectType">
                                    Selecciona el tipo de usuario
                                  </InputLabel>
                                  <Select 
                                      displayEmpty
                                      className={classes.textField}
                                      name="selectType"
                                      id="idSelectType"
                                      onChange={handleOnChangeType}
                                      value={this.state.rol}
                                      displayEmpty>
                                      <MenuItem value={0}>
                                          Administrador
                                      </MenuItem>
                                      <MenuItem id={1} value={1}>
                                          Chef
                                      </MenuItem>
                                      
                                  </Select>
                                  </FormControl>
                                </Grid>
                                <Grid container item xs={12}>
                                    <FormControl className={classes.textField} required>
                                        <InputLabel shrink htmlFor="idpass">
                                            Ingresa una contraseña
                                        </InputLabel>
                                        
                                        <TextField
                                          variant="outlined"
                                          margin="normal"
                                          required
                                          name="password"
                                          type="password"
                                          id="idpass"
                                          autoComplete="current-password"
                                          onChange={handleOnChangePass}
                                        />
                                        
                                    </FormControl>
                                    
                                </Grid>
                                <Grid container item xs={12}>
                                <FormControl className={classes.textField} required>
                                  <InputLabel shrink htmlFor="idpass1">
                                    Ingresa nuevamente la contraseña
                                  </InputLabel>
                                  <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    name="password"
                                    type="password"
                                    id="idpass1"
                                    autoComplete="current-password"
                                    onChange={handleOnChangeConfirmPass}
                                  />
                                  </FormControl>
                                </Grid>
                                <Grid container item xs={12}>
                                    <TextField
                                        id="standard-name"
                                        label="Ingresa un pin"
                                        className={classes.textField}
                                        onChange={handleOnChangePin}
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