import React, { useState } from 'react';
import { Grid, TextField, Typography, Paper, IconButton } from '@material-ui/core';
import { validateNumber } from '../../../../services/validations';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

export default function({ supply }) {
	const [ state, setState ] = useState({ quantity: 1 });

	const handleOnChangeNumber = (event) => {
		const number = event.target.value;
		if (validateNumber(number, 0)) {
			setState({ quantity: number });
		}
    };
    const handleDelete=()=>{
        console.log('eliminar');
        //myFish.splice(3, 1); indice, long
    }
	return (
		<Paper>
			<Grid container>
				<Grid item xs={6}>
					<Typography variant={'h6'} style={{ padding: 10 }}>
						{supply.name}
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<TextField
						value={state.quantity}
						name="detailRecipe"
						fullWidth
						type={'number'}
						margin="dense"
						label={'Cantidad de insumo'}
						onChange={handleOnChangeNumber}
					/>
				</Grid>
				<Grid item container xs={2} alignContent={'center'} justify={'center'}>
					<IconButton
						color="primary"
						aria-label="upload picture"
						component="span"
						onClick={(e) => handleDelete()}
					>
						<DeleteRoundedIcon color={'secondary'} />
					</IconButton>
				</Grid>
			</Grid>
		</Paper>
	);
}
