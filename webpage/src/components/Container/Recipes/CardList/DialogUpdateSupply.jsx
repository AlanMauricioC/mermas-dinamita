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
import AddIcon from '@material-ui/icons/Add';

import alertifyjs from 'alertifyjs';
import OptionSupply from './OptionSupply';

const styles = (theme) => ({
	media: {
		width: '75%'
	},
	top: {
		backgroundColor: theme.palette.primary.main,
		color: 'white'
	},
	button: {
		margin: theme.spacing.unit,
		width:'100%',
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
		const { recipe: { detailRecipe, idRecipe, nameRecipe, nameSupply, supplies=[], idSupply } } = props;
		console.log('update props',props);
		
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
			supplies: [],
			selectSupply:-1
		};
	}

	async componentDidMount() {
		const units = await getUnits();
		const { supplies } = await getSupplies();

		this.setState({ units, supplies });
		console.log('supplies', this.state.supplies);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.recipe.idRecipe === prevProps.recipe.idRecipe) return null;
		const { recipe: { detailRecipe, idRecipe, nameRecipe, nameSupply, supplies=[], idSupply } } = this.props;

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
		const handleOnChangeSupply = (event) => {
			const idSupply = event.target.value;
			this.setState({selectSupply:idSupply})
		};
		const handleOnChangeSelect = (event) => {
			const idSupply = event.target.value;
			const supply = this.state.supplies.find((supply) => idSupply === supply.id);
			
			if (!supply) return null;
			this.setState({ recipe: { ...this.state.recipe, idSupply, nameSupply: supply.name } });
		};

		const handleAddSupply = (event) => {
			const idSupply = this.state.selectSupply
			const supply = this.state.supplies.find((supply) => idSupply === supply.id);
			const isInRecipe = this.state.recipe.supplies.find((supply) => idSupply === supply.id);
			if (!supply||isInRecipe) return null;
			const supplies = this.state.recipe.supplies
			supplies.push(supply)
			this.setState({ recipe: { ...this.state.recipe, supplies } });
			console.log(supplies);
			
			console.log(this.state.recipe.supplies);
			
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
				alertifyjs.success('Receta actualizada correctamente');
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
				alertifyjs.success('Receta creada correctamente');
				const { supplies } = await getRecipes('', null);
				this.props.setRecipes(supplies);
			} else {
				alertifyjs.error('Error al crear el receta');
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
					{this.state.recipe.idRecipe ? 'Modificar' : 'Crear'} Receta
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
									Insumo
								</InputLabel>
								<Select
									value={this.state.recipe.idSupply||-1}
									onChange={handleOnChangeSelect}
									displayEmpty
									name="idSupply"
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
						<Grid item xs={12}>
							{this.state.recipe.supplies.map(supply=><OptionSupply supply={supply} key={supply.id}/>)}
						</Grid>
						<Grid item className={classes.input} xs={12} md={8}>
							<FormControl className={classes.select} required>
								<InputLabel shrink htmlFor="idSelectUnit">
									Agregar un insumo
								</InputLabel>
								<Select displayEmpty name="selectSupply" 
									onChange={handleOnChangeSupply}
									value={this.state.selectSupply}
									displayEmpty>
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
						<Grid item xs={4}>
							<Button
								variant="contained"
								color="primary"
								size="large"
								className={classes.button}
								startIcon={<AddIcon />}
								onClick={handleAddSupply}
							>
								Agregar insumo
							</Button>
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
