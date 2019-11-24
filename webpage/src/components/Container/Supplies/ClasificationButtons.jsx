import React from 'react';
import { Grid, Chip, Avatar } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { setSupplySelector } from '../../../actions';
import { useDispatch } from 'react-redux';
import { SUPPLY_SELECTOR } from '../../../constants';
import Info from '../../Miscellaneous/Info';

export default function ClasificationButtons(props) {
	const theme = useTheme();
	const styles = makeStyles({
		root: {},
		chip: {},
		warningButton: {
			backgroundColor: theme.palette.feedback.warning,
			color: '#FFF'
		},
		okButton: {
			backgroundColor: theme.palette.feedback.ok,
			color: '#FFF'
		},
		errorButton: {
			backgroundColor: theme.palette.feedback.error,
			color: '#FFF'
		}
	});
	const classes = styles();
	const dispatch = useDispatch();
	const searchOk = () => {
		dispatch(setSupplySelector(SUPPLY_SELECTOR.OK));
	};
	const searchWarning = () => {
		dispatch(setSupplySelector(SUPPLY_SELECTOR.WARNING));
	};
	const searchError = () => {
		dispatch(setSupplySelector(SUPPLY_SELECTOR.ERROR));
	};
	const clearSearch = () => {
		dispatch(setSupplySelector(SUPPLY_SELECTOR.NONE));
	};
	return (
		<div>
			<Grid container alignItems="center" spacing={1}>
				<Grid item>
					<Chip
						onClick={searchOk}
						className={classes.chip}
						avatar={<Avatar className={classes.okButton}>O</Avatar>}
						label="optimo"
					/>
				</Grid>
				<Grid item>
					<Chip
						onClick={searchWarning}
						className={classes.chip}
						avatar={<Avatar className={classes.warningButton}>C</Avatar>}
						label="cuidado"
					/>
				</Grid>
				<Grid item>
					<Chip
						onClick={searchError}
						className={classes.chip}
						avatar={<Avatar className={classes.errorButton}>E</Avatar>}
						label="Error"
					/>
				</Grid>
				<Grid item>
					<Chip onClick={clearSearch} className={classes.chip} avatar={<Avatar>L</Avatar>} label="limpiar" />
				</Grid>
                <Grid item>
                    <Info>Selecciona el estado de los insumos que deseas filtrar o limpia la busqueda con el botón "Limpiar"</Info>
                </Grid>
			</Grid>
		</div>
	);
}
