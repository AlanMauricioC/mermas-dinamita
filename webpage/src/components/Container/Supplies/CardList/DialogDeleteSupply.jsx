import { DialogContent, DialogActions, Button, Dialog, DialogTitle,withStyles, DialogContentText } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteSupply } from "../../../../actions";
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
		const { supply: { name} } = this.props;

		this.setState({
			name
		})
	}

	render() {
		const { handleClose, classes, open,id } = this.props
		const handleOnDelete=e=>{
			this.props.deleteSupply(this.props.supply)
			handleClose()
			alertifyjs.set('notifier', 'position', 'bottom-center');
			alertifyjs.success('Insumo eliminado satisfactoriamente')
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