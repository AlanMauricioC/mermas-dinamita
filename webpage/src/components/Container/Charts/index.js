import React, { Component } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Grid, TextField, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Echarts from 'echarts-for-react';
import moment from 'moment';
import { getConfig, getWasteChart, getRecipesChart, getRestockChart } from '../../../services/charts';
import Info from '../../Miscellaneous/Info';

class Charts extends Component {
	constructor(props) {
		super(props);
		const startDate = moment().subtract(7, 'days').valueOf();
		const endDate = moment.now();
		this.state = {
			startDate,
			endDate,
			chartConfig: {},
			chartType: -1
		};
	}

	async setMermas() {
		try {
			//un await
			const strStartDate = moment(this.state.startDate).format('YYYY-MM-DD');
			const strEndDate = moment(this.state.endDate).format('YYYY-MM-DD');
			const data = await getWasteChart(strStartDate, strEndDate);
			const config = getConfig('Mermas', data.dates, data.series);
			this.setState({ chartConfig: config });
		} catch (error) {}
	}

	async setRestock() {
		try {
			//un await
			const strStartDate = moment(this.state.startDate).format('YYYY-MM-DD');
			const strEndDate = moment(this.state.endDate).format('YYYY-MM-DD');
			const data = await getRestockChart(strStartDate, strEndDate);
			const config = getConfig('Pedidos realizados', data.dates, data.series);
			this.setState({ chartConfig: config });
		} catch (error) {}
	}

	async setRecipes() {
		try {
			//un await
			const strStartDate = moment(this.state.startDate).format('YYYY-MM-DD');
			const strEndDate = moment(this.state.endDate).format('YYYY-MM-DD');
			const data = await getRecipesChart(strStartDate, strEndDate);
			const config = getConfig('10 recetas más vendidas', data.dates, data.series);
			this.setState({ chartConfig: config });
		} catch (error) {}
	}

	render() {
		const handleDateChangeStart = (date) => {
			const value = moment(date).valueOf();
			//está dentro del rango?
			if (!moment(date).isBefore(this.state.endDate)) {
				return;
			}
			handleChangeChart()
			this.setState({ startDate: value });
		};
		const handleDateChangeEnd = (date) => {
			const value = moment(date).valueOf();
			//está dentro del rango?
			if (!moment(date).isBetween(this.state.startDate, undefined)) {
				return;
			}
			handleChangeChart()
			this.setState({ endDate: value });
		};

		const handleChangeChart = (e) => {
			let val
			if (e) {
				val = e.target.value;
				this.setState({ chartType: val });
			}else{
				val=this.state.chartType
			}

			switch (val) {
				case 0:
					this.setMermas();
					break;
				case 1:
					this.setRecipes();
					break;
				case 2:
					this.setRestock();
					break;
				default:
					this.setState({ chartConfig: {} });
					break;
			}
		};
		return (
			<Grid container>
				<Grid item xs={12} md={3}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							margin="normal"
							label="Fecha de inicio"
							format="dd/MM/yyyy"
							autoOk={true}
							onChange={handleDateChangeStart}
							value={this.state.startDate}
							maxDate={moment(this.state.endDate).subtract(1, 'day')}
							KeyboardButtonProps={{
								'aria-label': 'Fecha de inicio'
							}}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid item xs={12} md={3}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							margin="normal"
							label="Fecha final"
							format="dd/MM/yyyy"
							allowKeyboardControl={false}
							autoOk={true}
							onChange={handleDateChangeEnd}
							value={this.state.endDate}
							maxDate={moment()}
							minDate={moment(this.state.startDate).add(1, 'day')}
							KeyboardButtonProps={{
								'aria-label': 'Fecha de inicio'
							}}
						/>
					</MuiPickersUtilsProvider>
					<Info>
						Selecciona un rango de fechas para buscar
					</Info>
				</Grid>
				<Grid item xs={11}>
					<TextField
						id="statusRestock"
						select
						value={this.state.chartType}
						label="Seleccione una gráfica"
						onChange={handleChangeChart}
						fullWidth
						margin="normal"
					>
						<MenuItem value={-1} disabled>
							Ninguno
						</MenuItem>
						<MenuItem value={0}>Mermas</MenuItem>
						<MenuItem value={1}>Top 10 venta de recetas</MenuItem>
						<MenuItem value={2}>Pedidos</MenuItem>
					</TextField>
					
				</Grid>
				<Grid item xs={1}>
					<Info>
						Selecciona la gráfica que deseas mostrar
					</Info>
				</Grid>
				<Grid item xs={12}>
					<Echarts option={this.state.chartConfig} notMerge={true} />
				</Grid>
			</Grid>
		);
	}
}

export default Charts;
