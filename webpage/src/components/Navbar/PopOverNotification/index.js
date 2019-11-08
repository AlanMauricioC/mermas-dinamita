import React, { PureComponent } from 'react';
import { Popover, Grid, Divider, Typography, Button } from '@material-ui/core';
import StockNotification from './StockNotification';
import ExpirationNotification from './ExpirationNotification';
import {
	getStockNotifications,
	deleteExpirationNotification,
	deleteStockNotification
} from '../../../services/notifications';
import alertifyjs from 'alertifyjs';

class PopOverNotification extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			expiration: [],
			stock: []
		};
	}

	async setStockNotifications() {
		try {
			const { restockAlerts, expirationAlerts } = await getStockNotifications();
			//aquí va el otro ws
			const stock = Array.isArray(restockAlerts) ? restockAlerts : [];
			const expiration = Array.isArray(expirationAlerts) ? expirationAlerts : [];
			this.setState({ stock, expiration });
		} catch (error) {
			console.error('Error al consumir ws');
		}
	}

	componentDidMount() {
		this.setStockNotifications();
	}

	render() {
		const quantity = this.state.expiration.length + this.state.stock.length;
		this.props.notificationQuantity(quantity);
		const simpleStyle = {
			root: {
				position: 'fixed',
				top: 55,
				left: '1', //no sé cómo funciona... pero con este valor se acomoda :B
				width: 300
			},
			nofifications: {
				maxHeight: '55vh',
				overflow: 'auto'
			},
			button: {
				margin: 10,
				width: '90%'
			}
		};

		const handleOnDeleteStock = (id) => async (e) => {
			e.preventDefault();
			const deleted = await deleteExpirationNotification(id);
			if (deleted) {
				const stock = this.state.stock.filter((item) => item.id != id);
				this.setState({ stock });
			} else {
				alertifyjs.error('error al eliminar notificación');
			}
		};
		const handleOnDeleteExpiration = (id) => async (e) => {
			e.preventDefault();
			const deleted = await deleteExpirationNotification(id);
			if (deleted) {
				const expiration = this.state.expiration.filter((item) => item.id != id);
				this.setState({ expiration });
			} else {
				alertifyjs.error('error al eliminar notificación');
			}
		};

		const expirationNotification = (
			<div>
				{this.state.expiration.map(({ id, name, date }) => (
					<ExpirationNotification
						key={id}
						id={id}
						name={name}
						expirationDate={date}
						handleOnDelete={handleOnDeleteExpiration}
						onClose={this.props.close}
					/>
				))}
			</div>
		);

		const stockNotification = (
			<div>
				{this.state.stock.map(({ id, name, quantity, expectedQuantity }) => (
					<StockNotification
						key={id}
						id={id}
						name={name}
						actualQuantity={quantity}
						expectedQuantity={expectedQuantity}
						handleOnDelete={handleOnDeleteStock}
						onClose={this.props.close}
					/>
				))}
			</div>
		);
		const noNotification = (
			<div>
				<Typography variant="subtitle1" display="block" align="center">
					No hay notificaciones a mostrar
				</Typography>
			</div>
		);
		return (
			<div>
				<Popover
					open={this.props.isOpen}
					anchorReference="none"
					onClose={this.props.close}
					style={simpleStyle.root}
				>
					<Grid container direction="row">
						<Grid item xs={12} style={simpleStyle.nofifications}>
							<Typography variant="h6" color="secondary" display="block" align="center">
								Alertas de caducidad
							</Typography>
							<Divider variant={'middle'} />
						</Grid>
						{/* Contenido */}
						<Grid item xs={12}>
							{this.state.expiration.length ? expirationNotification : noNotification}
						</Grid>

						<Grid item xs={12}>
							<Divider variant={'middle'} />
							<Typography variant="h6" color="secondary" display="block" align="center">
								Alertas de almacén
							</Typography>
							<Divider variant={'middle'} />
						</Grid>
						<Grid item xs={12}>
							{this.state.stock.length ? stockNotification : noNotification}
						</Grid>
					</Grid>
				</Popover>
			</div>
		);
	}
}

export default PopOverNotification;
