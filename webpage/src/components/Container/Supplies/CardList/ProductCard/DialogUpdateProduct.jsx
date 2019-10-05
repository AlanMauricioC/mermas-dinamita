import React from 'react';
import { DialogContent, TextField, DialogActions, Button, Dialog, DialogTitle, Grid, Typography,  Switch, FormControlLabel } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';

export default function DialogUpdateProduct({ handleClose, open, card: { title, image, price, enable } }) {
	const theme = useTheme();
	const useStyles = makeStyles({
		media: {
			width: '75%',
		},
		top: {
			backgroundColor: theme.palette.primary.main,
			color: 'white'
		},
		button: {
			margin: theme.spacing.unit,
		},
		input: {
		display: 'none',
		},
	})
	console.log(enable);
	
	const [state, setState] = React.useState({
		enable,
		price
	});
	const classes = useStyles();
	const handleOnChangeSwitch = event => {
		setState({ ...state, enable: event.target.checked });
	};

	const handleOnChangeNumber = event => {
		setState({ ...state, price: event.target.value, });
	}
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
			fullWidth={true}
			maxWidth={'md'}
		>
			<DialogTitle id="form-dialog-title" className={classes.top}>Modificar Producto</DialogTitle>
			<DialogContent>
				<Grid container alignItems={'center'} justify="center">
					<Grid item xs={12} md={6} height="100%" >
						<center>
							<Typography variant={'h4'}>{title}</Typography>
							<img src={image} alt={title} className={classes.media} />
						</center>
					</Grid>
					<Grid container item xs={12} md={6}>
						<Grid item xs={8}>
							<input
								accept="image/*"
								className={classes.input}
								id="raised-button-file"
								multiple
								type="file"
							/>
							<label htmlFor="raised-button-file">
								<Button  component="span"variant="contained" color="primary" className={classes.button}>
									Subir archivo
								</Button>
							</label>
						</Grid>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Switch checked={state.enable} inputProps={{ 'aria-label': 'primary checkbox' }} onChange={handleOnChangeSwitch} />
								}
								label="Disponible"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField autoFocus fullWidth type='number' margin="dense" label={'Cantidad'} id='price' value={state.price} onChange={handleOnChangeNumber} />
						</Grid>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancelar
				</Button>
				<Button onClick={handleClose} variant="contained" color="primary">
					Aceptar
				</Button>
			</DialogActions>
		</Dialog>
	);
}
