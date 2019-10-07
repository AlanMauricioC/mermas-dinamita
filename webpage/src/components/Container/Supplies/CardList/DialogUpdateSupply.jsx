import { DialogContent, TextField, DialogActions, Button, Dialog, DialogTitle, Grid, withStyles, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import React, { Component } from 'react';
import { validateNumber, validateText } from "../../../../services/validations";
import { connect } from 'react-redux'
import { updateSupply, setSupplies } from '../../../../actions'
import { updateSupplies as updateService, getSupplies, insertSupplies } from "../../../../services/supplies";
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
			supply:{
				name,
				quantity,
				min,
				max,
				unit,
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.supply.id === prevProps.supply.id) return null
		const { supply: { name, quantity, min, max, avg, unit, idUnit, id } } = this.props;

		this.setState({
			supply:{
				name,
				quantity,
				min,
				max,
				unit,
				idUnit,
				avg,
				id
			}
		})
	}

	render() {
		const { handleClose, classes, open } = this.props
		const handleOnChangeNumber = event => {
			const number = event.target.value
			if (validateNumber(number, 0)) {
				this.setState({ supply: { ...this.state.supply, [event.target.name]: number} })
			}
		}
		const handleOnChangeSelect = event => this.setState({ supply: {...this.state.supply, [event.target.name]: event.target.value }})
		const handleOnChangeName = event => this.setState({ supply: {...this.state.supply, [event.target.name]: event.target.value } })
		const handleOnEnter = ev => {
			if (ev.key === 'Enter') {
				const enter = this.state.supply.id ? updateSupply : createSupply
				enter()
				ev.preventDefault();
			}
		}

		const updateSupply = async () => {
			console.log('actualizar insumo');
			const {supply} = this.state
			supply.idSupply = supply.id
			const updated = await updateService(supply)
			alertifyjs.set('notifier', 'position', 'bottom-center');
			if (updated) {
				this.props.updateSupply({ supply })
				alertifyjs.success('Insumo actualizado correctamente')
				handleClose()
			} else {
				alertifyjs.error('No se pudo actualizar este insumo')
			}

		}
		const createSupply = async () => {
			console.log('crear insumo');
			//const supply = this.state.supply
			const supply = this.state.supply
			supply.idSupply = supply.id
			supply.idUser=1// esto no debe de ser así :0!!
			const  inserted=await insertSupplies(supply)
			alertifyjs.set('notifier', 'position', 'bottom-center');
			if (inserted) {
				handleClose()
				alertifyjs.success('Insumo creado correctamente')
				const { supplies } = await getSupplies('', null)
				this.props.setSupplies(supplies)
			} else {
				alertifyjs.success('Error al crear el insumo')
				const { supplies } = await getSupplies('', null)
				this.props.setSupplies(supplies)
			}
			
		}
		return (
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
				maxWidth={'md'}
			>
				<DialogTitle id="form-dialog-title" className={classes.top}>{this.state.supply.id ? 'Modificar' : 'Crear'} Insumo</DialogTitle>
				<DialogContent>
					<Grid container alignItems={'center'}>
						<Grid item className={classes.input} xs={12} md={8}>
							<TextField name='name' onKeyPress={handleOnEnter} autoFocus required fullWidth type='text' margin="dense" label={'Nombre del insumo'} value={this.state.supply.name} onChange={handleOnChangeName} />
						</Grid>
						<Grid item className={classes.input} xs={12} md={4}>
							<TextField name='quantity' onKeyPress={handleOnEnter} required fullWidth type='number' margin="dense" label={'Cantidad actual'} value={this.state.supply.quantity} onChange={handleOnChangeNumber} />
						</Grid>
						<Grid item className={classes.input} xs={12} md={4}>
							<TextField name='min' onKeyPress={handleOnEnter} required fullWidth type='number' margin="dense" label={'Cantidad minima aceptable'} value={this.state.supply.min} onChange={handleOnChangeNumber} />
						</Grid>
						<Grid item className={classes.input} xs={12} md={4}>
							<TextField name='max' onKeyPress={handleOnEnter} required fullWidth type='number' margin="dense" label={'Cantidad maxima'} value={this.state.supply.max} onChange={handleOnChangeNumber} />
						</Grid>
						<Grid item className={classes.input} xs={12} md={4}>
							<FormControl className={classes.select} required >
								<InputLabel shrink htmlFor="idSelectUnit">
									Unidades
								</InputLabel>
								<Select
									value={this.state.supply.idUnit}
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
					<Button onClick={this.state.supply.id ? updateSupply : createSupply} variant="contained" color="primary">
						Aceptar
				</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default connect(null, { updateSupply, setSupplies })(withStyles(styles)(DialogUpdateSupply));