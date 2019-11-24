import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, Switch, TextField, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import alertifyjs from 'alertifyjs';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setRecipes, updateRecipe } from '../../../../actions';
import { deleteRecipeSupply, getRecipes, insertRecipes, insertRecipeSupply, updateRecipes as updateService, updateSupplyRecipe } from '../../../../services/recipes';
import { getSupplies } from '../../../../services/supplies';
import { getUnits } from '../../../../services/units';
import { validateText } from '../../../../services/validations';
import SelectSupply from '../../../Miscellaneous/SelectSupply';
import OptionSupply from './OptionSupply';
import imgPlaceHolder from './placeholder-image.png';
import { validateNumber } from "../../../../services/validations";
import InfoUpdateRecipe from "./InfoUpdateRecipe";
import Info from '../../../Miscellaneous/Info';

const styles = (theme) => ({
	media: {
		width: '75%'
	},
	top: {
		backgroundColor: theme.palette.primary.main,
		color: 'white'
	},
	button: {
		margin: 50,
		width: '80%'
	},
	input: {
		padding: 10,
		width: '100%'
	},
	select: {
		width: '100%'
	},
	files: {
		display: 'none'
	}
});

class DialogUpdateRecipe extends PureComponent {
	constructor(props) {
		super(props);
		const {
			recipe: {
				detailRecipe = '',
				idRecipe,
				nameRecipe = '',
				nameSupply = '',
				supplies = [],
				idSupply,
				status = 1,
				imageRecipe
			}
		} = props;
		this.state = {
			recipe: {
				detailRecipe,
				idRecipe,
				nameRecipe,
				nameSupply,
				supplies,
				image: imageRecipe,
				idSupply,
				status,
				quantitySupply:0,
			},
			units: [],
			supplies: [],
			isSupply: !!idSupply,
			isUpdate: !!idRecipe,
			isEnable: status === 1,
			selectSupply: -1
		};
	}

	async componentDidMount() {
		const units = await getUnits();
		const { supplies } = await getSupplies();
		if (!supplies) return;
		supplies.map((supply) => (supply.quantity = 1));
		this.setState({ units, supplies });
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.recipe.idRecipe === prevProps.recipe.idRecipe) return null;
		const {
			recipe: {
				detailRecipe = '',
				idRecipe,
				nameRecipe = '',
				nameSupply = '',
				supplies = [],
				idSupply,
				statusRecipe: status = 1,
				imageRecipe,
				quantitySupply
			}
		} = this.props;

		this.setState({
			recipe: {
				detailRecipe,
				idRecipe,
				idSupply,
				nameRecipe,
				image: imageRecipe,
				nameSupply,
				supplies,
				statusRecipe: status,
				quantitySupply:quantitySupply?quantitySupply:0,
			},
			isSupply: !!idSupply,
			isUpdate: !!idRecipe,
			isEnable: status === 1
		});
		console.log(this.state.recipe);
	}

	render() {
		const { handleClose, classes, open } = this.props;
		/**
		 * modifica el valor del select de insumos
		 * @param {*} event 
		 */
		const handleOnChangeSupply = (event) => this.setState({ selectSupply: event.target.value });

		/**
		 * define de qué insumo es la receta (preparar algún insumo)
		 * @param {*} event 
		 */
		const handleOnChangeSelect = (event) => {
			const idSupply = event.target.value;
			const supply = this.state.supplies.find((supply) => idSupply === supply.id);

			if (!supply) return null;
			this.setState({ recipe: { ...this.state.recipe, idSupply, nameSupply: supply.name } });
		};

		/**
		 * agrega insumos a la lista de la receta
		 * @param {*} event 
		 */
		const handleAddSupply = (event) => {
			const idSupply = this.state.selectSupply;
			const supply = this.state.supplies.find((supply) => idSupply === supply.id);
			const isInRecipe = this.state.recipe.supplies.find((supply) => idSupply === supply.id);
			if (!supply || isInRecipe) return null;
			const supplies = this.state.recipe.supplies;
			supplies.push(supply);
			this.setState({ recipe: { ...this.state.recipe, supplies } });
			if (this.state.isUpdate) {
				insertRecipeSupply(this.props.recipe.idRecipe, idSupply, 1);
			}
		};

		/**
		 * elimina insumos de la lista de la receta
		 * @param {number} idSupply id del insumo a eliminar de la lista de la receta
		 */
		const handleDeleteSupply = (idSupply) => {
			const supplies = this.state.recipe.supplies.filter((supply) => idSupply !== supply.id);
			this.setState({ recipe: { ...this.state.recipe, supplies } });
			if (this.state.isUpdate) {
				deleteRecipeSupply(this.props.recipe.idRecipe, idSupply);
			}
		};

		/**
		 * elimina insumos de la lista de la receta
		 * @param {Object} supplyToUpdate insumo a actualiza de la lista de la receta
		 */
		const handleUpdateSupply = (supplyToUpdate) => {
			const supplies = this.state.recipe.supplies.map(
				(supply) => (supply.id === supplyToUpdate.id ? supplyToUpdate : supply)
			);
			this.setState({ recipe: { ...this.state.recipe, supplies } });
		};
		/**Funcion para actualizar la contidad de insumo */
		const handleOnChangeQuantitySupply = (event) => {
		const number = event.target.value;
		if (validateNumber(number, 0)) {
			this.setState({recipe:{...this.state.recipe,quantitySupply:number}})
		}
	};

		/**
		 * maneja la entrada de datos de un campo de texto
		 */
		const handleOnChangeName = (event) => {
			this.setState({ recipe: { ...this.state.recipe, [event.target.name]: event.target.value } });
		};

		/**
		 * al dar enter crear o actualizar
		 */
		const handleOnEnter = (ev) => {
			if (ev.key === 'Enter') {
				const enter = this.state.isUpdate ? updateRecipe : createRecipe;
				enter();
				ev.preventDefault();
			}
		};

		const handleOnChangeImage = (event) => {
			const file = event.target.files[0];
			const image = URL.createObjectURL(file);
			this.setState({ recipe: { ...this.state.recipe, image, file } });
		};
		const handleSwitchSupply = (e) => {
			this.setState({ isSupply: !this.state.isSupply });
		};
		const handleSwitchEnableSupply = (e) => {
			this.setState({ isEnable: !this.state.isEnable });
		};
		/**llama al servidor para actualizar una receta*/
		const updateRecipe = async () => {
			for (const supplyToUpdate of this.state.recipe.supplies) {
				updateSupplyRecipe(supplyToUpdate.quantity, this.props.recipe.idRecipe, supplyToUpdate.id);
			}
			const { recipe } = this.state;
			recipe.imageRecipe = recipe.image;
			recipe.statusRecipe = this.state.isEnable ? 1 : 2;
			if (!this.state.isSupply) {
				recipe.idSupply = null;
			}
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

		/**llama al servidor para crear una receta */
		const createRecipe = async () => {
			console.log('crear receta');
			const recipe = this.state.recipe;
			if (!validateRecipe(recipe)) {
				return;
			}
			recipe.idUser = 1; // esto no debe de ser así :0!!
			recipe.statusRecipe = this.state.isEnable ? 1 : 2;
			if (!this.state.isSupply) {
				recipe.idSupply = null;
			}
			const inserted = await insertRecipes(recipe);
			alertifyjs.set('notifier', 'position', 'bottom-center');
			if (inserted) {
				handleClose();
				alertifyjs.success('Receta creada correctamente');
				const { recipes } = await getRecipes('');
				this.props.setRecipes(recipes);
			} else {
				alertifyjs.error('Error al crear el receta');
			}
		};

		/**Valida el input de los datos */
		const validateRecipe = (recipe) => {
			let validated = true;
			if (!validateText(recipe.nameRecipe, 1, 50)) {
				validated = false;
			}
			if (!validateText(recipe.detailRecipe, 0, 50)) {
				validated = false;
			}
			if (!recipe.supplies.length) {
				alertifyjs.warning('Debe de ingresar al menos un insumo la receta');
				validated = false;
			}
			if (this.state.isSupply && !recipe.idSupply) {
				alertifyjs.warning('Si la receta produce un insumo, favor de definirlo');
				validated = false;
			}
			return validated;
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
					{this.props.recipe.idRecipe ? 'Modificar' : 'Crear'} Receta
					<Info><InfoUpdateRecipe isUpdate={this.state.isUpdate}/></Info>
				</DialogTitle>
				<DialogContent>
					<Grid container alignItems={'center'}>
						<Grid item container xs={12} direction="row" justify="flex-start" alignItems="flex-start">
							<Grid item xs={4}>
								<img
									src={this.state.recipe.image || imgPlaceHolder}
									alt={this.state.recipe.nameRecipe}
									className={classes.media}
								/>
							</Grid>
							<Grid item xs={6}>
								<input
									accept="image/*"
									className={classes.files}
									id="raised-button-file"
									multiple
									type="file"
									onChange={handleOnChangeImage}
								/>
								<label htmlFor="raised-button-file">
									<Button
										component="span"
										variant="contained"
										color="primary"
										className={classes.button}
									>
										Subir archivo
									</Button>
								</label>
							</Grid>
							<Grid item xs={2}>
								<FormControlLabel
									control={
										<Switch
											checked={this.state.isEnable}
											inputProps={{ 'aria-label': 'primary checkbox' }}
											onChange={handleSwitchEnableSupply}
										/>
									}
									label="Está disponible"
								/>
							</Grid>
						</Grid>
						<Grid item className={classes.input} xs={12} md={12}>
							<TextField
								name="nameRecipe"
								fullWidth
								margin="dense"
								error={!validateText(this.state.recipe.nameRecipe, 1, 50)}
								label={'Nombre del receta'}
								autoFocus
								required
								onKeyPress={handleOnEnter}
								type="text"
								value={this.state.recipe.nameRecipe}
								onChange={handleOnChangeName}
							/>
						</Grid>
						<Grid item className={classes.input} xs={12} md={12}>
							<TextField
								name="detailRecipe"
								fullWidth
								error={!validateText(this.state.recipe.detailRecipe, 0, 50)}
								margin="dense"
								multiline
								rowsMax="4"
								label={'Descripción de la receta'}
								value={this.state.recipe.detailRecipe}
								onChange={handleOnChangeName}
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Switch
										checked={this.state.isSupply}
										inputProps={{ 'aria-label': 'primary checkbox' }}
										onChange={handleSwitchSupply}
									/>
								}
								label="Es un insumo"
							/>
						</Grid>
						<Grid item className={classes.input} xs={12} md={4}>
							{!this.state.isSupply ? null : (
								<SelectSupply
									value={this.state.recipe.idSupply || -1}
									onChange={handleOnChangeSelect}
								/>
							)}
						</Grid>
						<Grid item className={classes.input} xs={12} md={4}>
							{!this.state.isSupply ? null : (
								<TextField
									value={this.state.recipe.quantitySupply}
									name="detailRecipe"
									fullWidth
									type={'number'}
									margin="dense"
									label={'Cantidad de insumo'}
									onChange={handleOnChangeQuantitySupply}
								/>
							)}
						</Grid>
						<Grid item xs={12}>
							{this.state.recipe.supplies.map((supply) => (
								<OptionSupply
									supply={supply}
									key={supply.id}
									handleDeleteSupply={handleDeleteSupply}
									handleUpdateSupply={handleUpdateSupply}
								/>
							))}
						</Grid>
						<Grid item className={classes.input} xs={12} md={8}>
							<SelectSupply onChange={handleOnChangeSupply} value={this.state.selectSupply} />
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
						onClick={this.props.recipe.idRecipe ? updateRecipe : createRecipe}
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
