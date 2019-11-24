import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { setRecipes } from '../../../actions';
import { useDispatch } from 'react-redux';
import { getRecipes } from '../../../services/recipes';
import Info from '../../Miscellaneous/Info';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		display: 'flex',
		alignItems: 'center'
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
		getRecipes(inputValue, null).then(({ recipes }) => dispatch(setRecipes(recipes)));
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
						placeholder="Buscar recetas"
						inputProps={{ 'aria-label': 'search google maps' }}
						onChange={handleOnChangeSearch}
					/>
				</Paper>
			</Grid>
			<Grid item xs={1}>
				<Info>Busca las recetas escribiendo su nombre en el campo de búsqueda</Info>
			</Grid>
		</Grid>
	);
}
