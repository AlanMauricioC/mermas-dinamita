import { IconButton, InputBase, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSuppliesSearch } from '../../../actions';
import Info from '../../Miscellaneous/Info';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	},
	input: {
		flex: 1
	},
	iconButton: {
		padding: 10
	}
}));

export default function CustomizedInputBase() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const handleOnChangeSearch = (e) => {
		const inputValue = e.target.value;
		dispatch(setSuppliesSearch(inputValue));
	};
	return (
		<Grid container>
			<Grid item xs={11}>
				<Paper className={classes.root}>
					<IconButton className={classes.iconButton} aria-label="search">
						<SearchIcon />
					</IconButton>
					<InputBase
						className={classes.input}
						placeholder="Buscar insumos"
						inputProps={{ 'aria-label': 'search google maps' }}
						onChange={handleOnChangeSearch}
					/>
				</Paper>
			</Grid>
			<Grid item xs={1}>
				<Info>
					Busca los insumos escribiendo su nombre en el campo de búsqueda
				</Info>
			</Grid>
		</Grid>
	);
}
