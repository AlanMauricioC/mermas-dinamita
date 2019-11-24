import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, withStyles } from '@material-ui/core';
import alertifyjs from 'alertifyjs';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteRecipe } from '../../../../actions';
import { deleteRecipes } from '../../../../services/recipes';

const styles = (theme) => ({
	media: {
		width: '75%'
	},
	top: {
		backgroundColor: theme.palette.secondary.main,
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

class DialogUpdateRecipe extends Component {
	constructor(props) {
		super(props);
		const { recipe: { nameRecipe: name, quantity, min, max, unit } } = props;
		console.log('props', props);

		this.state = {
			name,
			quantity,
			min,
			max,
			unit
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.recipe.id === prevProps.recipe.id) return null;
		const { recipe: { nameRecipe: name } } = this.props;

		this.setState({
			name
		});
	}

	render() {
		const { handleClose, classes, open, id } = this.props;
		const handleOnDelete = async () => {
			console.log('eliminla receta');
			//const recipe = this.state.recipe
			const recipe = this.props.recipe;
			recipe.idUser = 1; // esto no debe de ser así :0!!
			const deleted = await deleteRecipes(recipe);
			alertifyjs.set('notifier', 'position', 'bottom-center');
			if (deleted) {
				handleClose();
				alertifyjs.success('Insumo eliminado satisfactoriamente');
				this.props.deleteRecipe(this.props.recipe);
			} else {
				alertifyjs.error('Error al eliminar la receta');
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
					Eliminar Insumo
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Esta acción es irreversible ¿Está seguro de que desea eliminar la receta {this.state.name}?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="outlined" color="primary">
						Cancelar
					</Button>
					<Button onClick={handleOnDelete} variant="contained" color="primary">
						Aceptar
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default connect(null, { deleteRecipe })(withStyles(styles)(DialogUpdateRecipe));
