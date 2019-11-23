import { Grid } from '@material-ui/core';
import React from 'react';
import CardList from './CardList';
import ClasificationButtons from './ClasificationButtons';
import Search from './Search';
import Info from '../../Miscellaneous/Info';

const Supplies = () => {
	return (
		<Grid container>
			<Grid item container spacing={3}>
				<Grid item xs={12} md={7}>
					<Search />
				</Grid>

				<Grid item xs={12} md={4}>
					<ClasificationButtons />
				</Grid>
				<Grid item xs={1}>
					<Info>Busca los insumos que desees</Info>
				</Grid>
			</Grid>
			<Grid item container>
				<CardList />
			</Grid>
		</Grid>
	);
};

export default Supplies;
