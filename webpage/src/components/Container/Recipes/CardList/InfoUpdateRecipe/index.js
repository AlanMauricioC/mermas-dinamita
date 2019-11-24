import React, { Fragment } from 'react';
import { Box, Typography } from '@material-ui/core';

const InfoUpdateRecipe = ({ isUpdate }) => {

	return (
		<div>
			<Typography display="block">{isUpdate?'Actualiza':'Crea'} una receta con los siguientes datos:</Typography>
            <Box display="block">
				<Box display="inline" fontWeight="fontWeightBold">
					Imagen de la receta:
				</Box>
				<Box display="inline">Imagen del platillo.</Box>
			</Box>
			<Box display="block">
				<Box display="inline" fontWeight="fontWeightBold">
					Nombre de la receta:
				</Box>
				<Box display="inline">Nombre con el que se guarda la receta, no puede tener más de 45 caracteres.</Box>
			</Box>
			<Box display="block">
				<Box display="inline" fontWeight="fontWeightBold">
					Descripción de la recta:
				</Box>
				<Box display="inline">Descripción opcional que permite saber más detalles sobre la receta.</Box>
			</Box>
			<Box display="block">
				<Box display="inline" fontWeight="fontWeightBold">
					Es un insumo:
				</Box>
				<Box display="inline">Define si esta receta se puede usar para generar otros insumos.</Box>
			</Box>
			<Box display="block">
				<Box display="inline" fontWeight="fontWeightBold">
					Agregar insumo:
				</Box>
				<Box display="inline">Agrega un insumo que es usado para la receta.</Box>
			</Box>
		</div>
	);
};

export default InfoUpdateRecipe;