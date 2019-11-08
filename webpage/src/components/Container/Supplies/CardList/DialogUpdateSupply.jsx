import {
	DialogContent,
	TextField,
	DialogActions,
	Button,
	Dialog,
	DialogTitle,
	Grid,
	withStyles,
	Select,
	MenuItem,
	InputLabel,
	FormControl
} from '@material-ui/core';
import React, { PureComponent } from 'react';
import { validateNumber, validateText } from '../../../../services/validations';
import { connect } from 'react-redux';
import { updateSupply, setSupplies } from '../../../../actions';
import { updateSupplies as updateService, getSupplies, insertSupplies } from '../../../../services/supplies';
import { getUnits } from '../../../../services/units';

import alertifyjs from 'alertifyjs';

const styles = (theme) => ({
	media: {
		width: '75%'
	},
	top: {
		backgroundColor: theme.palette.primary.main,
		color: 'white'
	},
	button: {
		margin: theme.spacing(1)
	},
	input: {
		padding: 10,
		width: '100%'
	},
	select: {
		width: '100%'
	}
});

class DialogUpdateSupply extends PureComponent {
	constructor(props) {
		super(props);
		const { supply: { name, quantity, min, max, unit } } = props;
		alertifyjs.set('notifier', 'position', 'bottom-center');
		this.state = {
			supply: {
				name,
				quantity,
				min,
				max,
				unit: {
					id: 0,
					name: ''
				}
			},
			units: []
		};
	}

	async componentDidMount() {
		const units = await getUnits();
		if (units) {
			this.setState({ units });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.supply.id === prevProps.supply.id) return null;
		const { supply: { name, quantity, min, max, avg, unit, idUnit, id } } = this.props;

		this.setState({
			supply: {
				name,
				quantity,
				min,
				max,
				unit: {
					id: idUnit,
					name: unit
				},
				avg,
				id
			},
			invalidName: false,
			invalidMin: false,
			invalidMax: false
		});
	}

	render() {
		console.log(this.state.units);

		const { handleClose, classes, open } = this.props;
		const handleOnChangeNumber = (event) => {
			const number = event.target.value;
			if (validateNumber(number, 0)) {
				this.setState({ supply: { ...this.state.supply, [event.target.name]: number } });
			}
		};
		const handleOnChangeSelect = (event) => {
			const id = event.target.value;
			const unit = this.state.units.find((unit) => id === unit.id);
			console.log(unit);

			if (!unit) return null;
			this.setState({ supply: { ...this.state.supply, unit } });
		};
		const handleOnChangeName = (event) =>
			this.setState({ supply: { ...this.state.supply, [event.target.name]: event.target.value } });
		const handleOnEnter = (ev) => {
			if (ev.key === 'Enter') {
				const enter = this.state.supply.id ? updateSupply : createSupply;
				enter();
				ev.preventDefault();
			}
		};

		const updateSupply = async () => {
			console.log('actualizar insumo');
			const { min, max, name, quantity, id, unit: { id: idUnit, name: unit } } = this.state.supply;
			const idUser = 1; // esto no debe de ser así :0!!
			const data = {
				id,
				idUser,
				idUnit,
				max,
				min,
				name,
				quantity,
				unit
			};
			if (!validateSupply(data)) {
				alertifyjs.warning('Favor de verificar los datos');
				return null;
			}
			const updated = await updateService(data);
			if (updated) {
				this.props.updateSupply({ supply: data });
				alertifyjs.success('Insumo actualizado correctamente');
				handleClose();
			} else {
				alertifyjs.error('No se pudo actualizar este insumo');
			}
		};
		const createSupply = async () => {
			const { min, max, name, quantity, unit: { id: idUnit } } = this.state.supply;
			const idUser = 1; // esto no debe de ser así :0!!
			const data = {
				idUser,
				idUnit,
				max,
				min,
				name,
				quantity
			};
			if (!validateSupply(data)) {
				alertifyjs.warning('Favor de verificar los datos');
				return null;
			}
			const inserted = await insertSupplies(data);
			if (inserted) {
				handleClose();
				alertifyjs.success('Insumo creado correctamente');
				const { supplies } = await getSupplies('', null);
				this.props.setSupplies(supplies);
			} else {
				alertifyjs.error('Error al crear el insumo');
				const { supplies } = await getSupplies('', null);
				this.props.setSupplies(supplies);
			}
		};

		const validateSupply = (supply) => {
			let invalidName = !validateText(supply.name, 1, 45);
			let invalidMin = !validateNumber(supply.min,0, supply.max);
			let invalidMax = !validateNumber(supply.max,supply.min);
			this.setState({invalidMax,invalidMin,invalidName})
			return !(invalidName||invalidMin||invalidMax)
		};
		const unitItems = () => {
			if (this.state.units) {
				return this.state.units.map(({ id, name }) => (
					<MenuItem key={id} value={id}>
						{name}
					</MenuItem>
				));
			} else {
				return null;
			}
		};
		return (
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
				maxWidth={'md'}
			>
				<DialogTitle id="form-dialog-title" className={classes.top}>
					{this.state.supply.id ? 'Modificar' : 'Crear'} Insumo
				</DialogTitle>
				<DialogContent>
					<Grid container alignItems={'center'}>
						<Grid item className={classes.input} xs={12} md={8}>
							<TextField
								name="name"
								onKeyPress={handleOnEnter}
								error={this.state.invalidName}
								autoFocus
								required
								fullWidth
								type="text"
								margin="dense"
								label={'Nombre del insumo'}
								value={this.state.supply.name}
								onChange={handleOnChangeName}
							/>
						</Grid>
						<Grid item className={classes.input} xs={12} md={4}>
							{this.state.supply.id ? (
								<TextField
									name="quantity"
									onKeyPress={handleOnEnter}
									disabled={true}
									fullWidth
									type="number"
									margin="dense"
									label={'Cantidad actual'}
									value={this.state.supply.quantity}
								/>
							) : null}
						</Grid>
						<Grid item className={classes.input} xs={12} md={4}>
							<TextField
								name="min"
								error={this.state.invalidMin}
								onKeyPress={handleOnEnter}
								required
								fullWidth
								type="number"
								margin="dense"
								label={'Cantidad minima aceptable'}
								value={this.state.supply.min}
								onChange={handleOnChangeNumber}
							/>
						</Grid>
						<Grid item className={classes.input} xs={12} md={4}>
							<TextField
								name="max"
								error={this.state.invalidMax}
								onKeyPress={handleOnEnter}
								required
								fullWidth
								type="number"
								margin="dense"
								label={'Cantidad maxima'}
								value={this.state.supply.max}
								onChange={handleOnChangeNumber}
							/>
						</Grid>
						<Grid item className={classes.input} xs={12} md={4}>
							<FormControl className={classes.select} required>
								<InputLabel shrink htmlFor="idSelectUnit">
									Unidades
								</InputLabel>
								<Select
									value={this.state.supply.unit.id}
									onChange={handleOnChangeSelect}
									displayEmpty
									name="idUnit"
								>
									<MenuItem value={-1}>
										<em>None</em>
									</MenuItem>
									{unitItems()}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="outlined" color="primary">
						Cancelar
					</Button>
					<Button
						onClick={this.state.supply.id ? updateSupply : createSupply}
						variant="contained"
						color="primary"
					>
						Aceptar
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default connect(null, { updateSupply, setSupplies })(withStyles(styles)(DialogUpdateSupply));
