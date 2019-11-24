import { Grid, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import React from 'react';
import { validateNumber } from '../../../../services/validations';

export default function({ supply, handleDeleteSupply, handleUpdateSupply }) {
	if (!supply.quantity) {
		supply.quantity = 1;
	}
	const handleOnChangeNumber = (event) => {
		const number = event.target.value;
		if (validateNumber(number, 0)) {
			supply.quantity = number;
			handleUpdateSupply(supply);
		}
	};
	return (
		<Paper style={{ marginTop: 10 }}>
			<Grid container>
				<Grid item xs={6}>
					<Typography variant={'h6'} style={{ padding: 10 }}>
						{supply.name}
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<TextField
						value={supply.quantity}
						name="detailRecipe"
						fullWidth
						type={'number'}
						margin="dense"
						label={'Cantidad de insumo'}
						onChange={handleOnChangeNumber}
					/>
				</Grid>
				<Grid item container xs={1} alignContent={'center'} justify={'flex-start'}>
					<Typography variant={'body1'} style={{ padding: 10 }}>
						{supply.unit || supply.nameUnit}
					</Typography>
				</Grid>
				<Grid item container xs={2} alignContent={'center'} justify={'center'}>
					<IconButton
						color="primary"
						aria-label="upload picture"
						component="span"
						onClick={(e) => handleDeleteSupply(supply.id)}
					>
						<DeleteRoundedIcon color={'secondary'} />
					</IconButton>
				</Grid>
			</Grid>
		</Paper>
	);
}
