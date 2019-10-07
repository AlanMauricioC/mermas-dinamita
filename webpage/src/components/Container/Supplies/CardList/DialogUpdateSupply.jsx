import { DialogContent, TextField, DialogActions, Button, Dialog, DialogTitle, Grid, withStyles, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import React, { Component } from 'react';
import { validateNumber, validateText } from "../../../../services/validations";
import { connect } from 'react-redux'
import { updateSupply, setSupplies } from '../../../../actions'
import { getSupplies } from "../../../../services/supplies";
import alertifyjs from "alertifyjs";

const styles = theme => (
	{
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
			padding: 10,
			width: '100%',
		},
		select: {
			width: '100%',
		}
	}
)

class DialogUpdateSupply extends Component {
	constructor(props) {
		super(props);
		const { supply: { name, quantity, min, max, unit } } = props;
		this.state = {
			name,
			quantity,
			min,
			max,
			unit,
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.supply.id === prevProps.supply.id) return null
		const { supply: { name, quantity, min, max, avg,unit, idUnit, id } } = this.props;

		this.setState({
			name,
			quantity,
			min,
			max,
			unit,
			idUnit,
			avg,
			id
		})
	}

	render() {
		const { handleClose, classes, open } = this.props
		const handleOnChangeNumber = event => {
			const number = event.target.value
			if (validateNumber(number, 1)) {
				this.setState({ [event.target.name]: number })
			}
		}
		const handleOnChangeSelect = event => this.setState({ [event.target.name]: event.target.value })
		const handleOnChangeName = event => this.setState({ [event.target.name]: event.target.value })
		const handleOnEnter = ev => {
			if (ev.key === 'Enter') {
				const enter = this.state.id ? updateSupply : createSupply
				enter()
				ev.preventDefault();
			}
		}

		const updateSupply = () => {
			console.log('actualizar insumo');
			const supply = this.state
			this.props.updateSupply({ supply })
			handleClose()
			alertifyjs.set('notifier', 'position', 'bottom-center');
			alertifyjs.success('Insumo actualizado correctamente')
		}
		const createSupply = () => {
			console.log('crear insumo');
			//const supply = this.state
			this.props.setSupplies(getSupplies)
			handleClose()
			alertifyjs.set('notifier', 'position', 'bottom-center');
			alertifyjs.success('Insumo creado correctamente')
		}
		return (
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
				maxWidth={'md'}
			>
				<DialogTitle id="form-dialog-title" className={classes.top}>{this.state.id ? 'Modificar' : 'Crear'} Insumo</DialogTitle>
				<DialogContent>
					<Grid container alignItems={'center'}>
						<Grid item className={classes.input} xs={12} md={8}>
							<TextField name='name' onKeyPress={handleOnEnter} autoFocus required fullWidth type='text' margin="dense" label={'Nombre del insumo'} value={this.state.name} onChange={handleOnChangeName} />
						</Grid>
						<Grid item className={classes.input} xs={12} md={4}>
							<TextField name='quantity' onKeyPress={handleOnEnter} required fullWidth type='number' margin="dense" label={'Cantidad actual'} value={this.state.quantity} onChange={handleOnChangeNumber} />
						</Grid>
						<Grid item className={classes.input} xs={12} md={4}>
							<TextField name='min' onKeyPress={handleOnEnter} required fullWidth type='number' margin="dense" label={'Cantidad minima aceptable'} value={this.state.min} onChange={handleOnChangeNumber} />
						</Grid>
						<Grid item className={classes.input} xs={12} md={4}>
							<TextField name='max' onKeyPress={handleOnEnter} required fullWidth type='number' margin="dense" label={'Cantidad maxima'} value={this.state.max} onChange={handleOnChangeNumber} />
						</Grid>
						<Grid item className={classes.input} xs={12} md={4}>
							<FormControl className={classes.select} required >
								<InputLabel shrink htmlFor="idSelectUnit">
									Unidades
								</InputLabel>
								<Select
									value={this.state.idUnit}
									onChange={handleOnChangeSelect}
									displayEmpty
									name="idUnit"

								>
									<MenuItem value={0}>
										<em>None</em>
									</MenuItem>
									<MenuItem value={1}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="outlined" color="primary">
						Cancelar
				</Button>
					<Button onClick={this.state.id ? updateSupply : createSupply} variant="contained" color="primary">
						Aceptar
				</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default connect(null, { updateSupply, setSupplies })(withStyles(styles)(DialogUpdateSupply));