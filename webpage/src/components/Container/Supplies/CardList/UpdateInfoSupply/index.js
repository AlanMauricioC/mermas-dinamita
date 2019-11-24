import React, { Fragment } from 'react';
import { Box, Typography } from '@material-ui/core';

const UpdateInfoSupply = ({ isUpdate }) => {
	const insertOnly = (
		<Fragment>
			<Box display="block">
				<Box display="inline" fontWeight="fontWeightBold">
					Cantidad inicial:
				</Box>
				<Box display="inline">¿Cuánto se tiene actualmente de este insumo?</Box>
			</Box>
			<Box display="block">
				<Box display="inline" fontWeight="fontWeightBold">
					Caducidad:
				</Box>
				<Box display="inline">Fecha en la que caduca este insumo</Box>
			</Box>
		</Fragment>
	);
	return (
		<div>
			<Typography display="block">Crea un insumo con los siguientes datos:</Typography>
			<Box display="block">
				<Box display="inline" fontWeight="fontWeightBold">
					Nombre del insumo:
				</Box>
				<Box display="inline">Nombre con el que se guarda el insumo, no puede tener más de 45 caracteres</Box>
			</Box>
			{isUpdate ? null : insertOnly}
			<Box display="block">
				<Box display="inline" fontWeight="fontWeightBold">
					Cantidad minima aceptable:
				</Box>
				<Box display="inline">Cantidad minima de este insumo antes de tener que hacer un pedido</Box>
			</Box>
			<Box display="block">
				<Box display="inline" fontWeight="fontWeightBold">
					Cantidad máxima aceptable:
				</Box>
				<Box display="inline">Cantidad máxima de este insumo que sobrepasa lo común</Box>
			</Box>
			<Box display="block">
				<Box display="inline" fontWeight="fontWeightBold">
					Unidades:
				</Box>
				<Box display="inline">Unidad de medida de este insumo</Box>
			</Box>
		</div>
	);
};

export default UpdateInfoSupply;
