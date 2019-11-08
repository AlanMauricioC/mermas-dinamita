import { DialogContent, DialogActions, Button, Dialog, DialogTitle,withStyles, DialogContentText } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteSupply } from "../../../../actions";
import { deleteSupplies } from "../../../../services/supplies";
import alertifyjs from "alertifyjs";


const styles = theme => (
	{
		media: {
			width: '75%',
		},
		top: {
			backgroundColor: theme.palette.secondary.main,
			color: 'white'
		},
		button: {
			margin: theme.spacing(1),
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
		const { supply: { name} } = this.props;

		this.setState({
			name
		})
	}

	render() {
		const { handleClose, classes, open,id } = this.props
		const handleOnDelete= async ()=>{
			console.log('eliminar insumo');
			//const supply = this.state.supply
			const supply = this.props.supply
			supply.idUser = 1// esto no debe de ser así :0!!
			const deleted = await deleteSupplies(supply)
			alertifyjs.set('notifier', 'position', 'bottom-center');
			if (deleted) {
				handleClose()
				alertifyjs.success('Insumo eliminado satisfactoriamente')
				this.props.deleteSupply(this.props.supply)
			} else {
				alertifyjs.error('Error al eliminar el insumo')
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
				<DialogTitle id="form-dialog-title" className={classes.top}>Eliminar Insumo</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Esta acción es irreversible
						¿Está seguro de que desea eliminar el insumo {this.state.name}?
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

export default connect(null, { deleteSupply})(withStyles(styles)(DialogUpdateSupply))