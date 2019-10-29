import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
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
  }
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //aqui empieza insumos
  const insumos = [
    {
      value: '1',
      label: 'Jitomate',
    },
    {
      value: '2',
      label: 'Chiles',
    },
    
  ];
  const [values, setValues] = React.useState({
    currency: 'EUR',
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
 
 


  return (
    <div>
      <Button type="button" color="primary" className={classes.button} variant="contained" onClick={handleOpen}>
        Agregar merma
      </Button>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h3 id="simple-modal-title">Añadir una nueva merma</h3>
           <TextField
                id="standard-select-currency-native"
                select
                label="Selecciona una merma"
                className={classes.textField}
                value={values.insumos}
                onChange={handleChange('insumos')}
                SelectProps={{
                native: true,
                MenuProps: {
                    className: classes.menu,
                },
                }}
                margin="normal">
                {
                
                insumos.map(option => (
                  <option key={option.value} value={option.value}>
                      {option.label}
                  </option>
                ))
                }
            </TextField>

          <TextField
            id="standard-name"
            label="Cantidad"
            className={classes.textField}
            onChange={handleChange('name')}
            margin="normal"
            />
          <br/>
          <Button type="button" color="primary" className={classes.button} variant="contained" onClick={console.log("algo")}>
              Agregar
          </Button>
          
          {/*<SimpleModal />*/}
        </div>
      </Modal>
    </div>
  );
}