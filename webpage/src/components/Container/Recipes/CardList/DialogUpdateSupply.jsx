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
import React, { Component } from 'react';
import { validateNumber, validateText } from '../../../../services/validations';
import { connect } from 'react-redux';
import { updateRecipe, setRecipes } from '../../../../actions';
import { updateRecipes as updateService, getRecipes, insertRecipes } from '../../../../services/recipes';
import { getSupplies } from '../../../../services/supplies';
import { getUnits } from '../../../../services/units';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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
		margin: theme.spacing.unit
	},
	input: {
		padding: 10,
		width: '100%'
	},
	select: {
		width: '100%'
	}
});

class DialogUpdateRecipe extends Component {
	constructor(props) {
		super(props);
		const { recipe: { detailRecipe, idRecipe, nameRecipe, nameSupply, supplies,idSupply } } = props;
		this.state = {
			recipe: {
				detailRecipe,
				idRecipe,
				idRecipe,
				nameRecipe,
				nameSupply,
				supplies,
				idSupply
			},
			units: [],
			supplies: []
		};
	}

	async componentDidMount() {
		const units = await getUnits();
		const {supplies} = await getSupplies();
		
		this.setState({ units, supplies });
		console.log('supplies',this.state.supplies);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.recipe.idRecipe === prevProps.recipe.idRecipe) return null;
		const { recipe: { detailRecipe, idRecipe, nameRecipe, nameSupply, supplies,idSupply } } = this.props;

		this.setState({
			recipe: {
				detailRecipe,
				idRecipe,
				idSupply,
				nameRecipe,
				nameSupply,
				supplies
			}
		});
	}

	render() {
		const { handleClose, classes, open } = this.props;
		const handleOnChangeNumber = (event) => {
			const number = event.target.value;
			if (validateNumber(number, 0)) {
				this.setState({ recipe: { ...this.state.recipe, [event.target.name]: number } });
			}
		};
		const handleOnChangeSelect = (event) => {
			const id = event.target.value;
			const supply = this.state.supplies.find((supply) => id === supply.id);

			if (!supply) return null;
			this.setState({ recipe: { ...this.state.recipe, id, supply: supply.name } });
			console.log({ ...this.state.recipe, supply: supply.name });
		};
		const handleOnChangeName = (event) =>
			this.setState({ recipe: { ...this.state.recipe, [event.target.name]: event.target.value } });
		const handleOnEnter = (ev) => {
			if (ev.key === 'Enter') {
				const enter = this.state.recipe.idRecipe ? updateRecipe : createRecipe;
				enter();
				ev.preventDefault();
			}
		};

		const updateRecipe = async () => {
			console.log('actualizar receta');
			const { recipe } = this.state;
			const updated = await updateService(recipe);
			alertifyjs.set('notifier', 'position', 'bottom-center');
			if (updated) {
				this.props.updateRecipe({ recipe });
				alertifyjs.success('Insumo actualizado correctamente');
				handleClose();
			} else {
				alertifyjs.error('No se pudo actualizar este receta');
			}
		};
		const createRecipe = async () => {
			console.log('crear receta');
			//const recipe = this.state.recipe
			const recipe = this.state.recipe;
			recipe.idUser = 1; // esto no debe de ser así :0!!
			const inserted = await insertRecipes(recipe);
			alertifyjs.set('notifier', 'position', 'bottom-center');
			if (inserted) {
				handleClose();
				alertifyjs.success('Insumo creado correctamente');
				const { supplies } = await getRecipes('', null);
				this.props.setRecipes(supplies);
			} else {
				alertifyjs.success('Error al crear el receta');
				const { supplies } = await getRecipes('', null);
				this.props.setRecipes(supplies);
			}
		};
		return (
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
				maxWidth={'md'}
				fullScreen
			>
				<DialogTitle id="form-dialog-title" className={classes.top}>
					{this.state.recipe.idRecipe ? 'Modificar' : 'Crear'} Insumo
				</DialogTitle>
				<DialogContent>
					<Grid container alignItems={'center'}>
						<Grid item className={classes.input} xs={12} md={12}>
							<TextField
								name="nameRecipe"
								onKeyPress={handleOnEnter}
								autoFocus
								required
								fullWidth
								type="text"
								margin="dense"
								label={'Nombre del receta'}
								value={this.state.recipe.nameRecipe}
								onChange={handleOnChangeName}
							/>
						</Grid>
						<Grid item className={classes.input} xs={12} md={12}>
							<TextField
								name="detailRecipe"
								fullWidth
								margin="dense"
								multiline
								rowsMax="4"
								label={'Descripción de la receta'}
								value={this.state.recipe.detailRecipe}
								onChange={handleOnChangeName}
							/>
						</Grid>
						<Grid item className={classes.input} xs={12} md={4}>
							<FormControl className={classes.select} required>
								<InputLabel shrink htmlFor="idSelectUnit">
									Unidades
								</InputLabel>
								<Select
									value={this.state.recipe.idSupply}
									onChange={handleOnChangeSelect}
									displayEmpty
									name="idUnit"
								>
									<MenuItem value={-1}>
										<em>None</em>
									</MenuItem>
									{this.state.supplies.map(({ id, name }) => (
										<MenuItem key={id} value={id}>
											{name}
										</MenuItem>
									))}
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
						onClick={this.state.recipe.idRecipe ? updateRecipe : createRecipe}
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

export default connect(null, { updateRecipe, setRecipes })(withStyles(styles)(DialogUpdateRecipe));
