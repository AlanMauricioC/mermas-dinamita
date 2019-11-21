import React, { Component } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Grid, TextField, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Echarts from "echarts-for-react";
import moment from 'moment';
import { getConfig } from "../../../services/charts";
import alertifyjs from "alertifyjs";

class Charts extends Component {
	constructor(props) {
		super(props);
		const startDate =moment().subtract(7, 'days');
		const endDate =  moment.now();
		this.state = {
			startDate,
            endDate,
            chartConfig:{},
            chartType:-1,
		};
    }
    
    async setMermas(){
        try {
            //un await
            const config=getConfig()
            this.setState({chartConfig:config})
        } catch (error) {
            
        }
    }
    

	render() {
        
		const handleDateChangeStart = (date) => {
			this.setState({ startDate: moment(date).valueOf() });
		};
		const handleDateChangeEnd = (date) => {
            const value=moment(date).valueOf()
            //está dentro del rango?
            
            if (!moment(date).isBetween(this.state.startDate,undefined)) {
                alertifyjs.warning('Por favor elije una fecha valida')
                return
            }
            console.log('asd');
            
			this.setState({ endDate: value });
        };
        const handleDateChangeCapture=(e)=>{
            console.log(e);
            
        }
        const handleChangeChart=(e)=>{
            const val=e.target.value;

            this.setState({chartType:val})
            switch (val) {
                case 0:
                    this.setMermas()
                    break;
            
                default:
                    this.setState({chartConfig:{}})
                    break;
            }

        }
        return (
			<Grid container>
				<Grid item xs={12} md={3}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							margin="normal"
							id="date-picker-dialog"
							label="Fecha de inicio"
							format="dd/MM/yyyy"
                            inputValue={moment(this.state.startDate).format('DD/MM/YYYY')}
                            maxDate={this.state.endDate}
							value={this.state.startDate}
                            onChange={handleDateChangeStart}
                            onChangeCapture={handleDateChangeCapture}
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
							id="date-picker-dialog"
							label="Fecha final"
							format="dd/MM/yyyy"
                            value={this.state.endDate}
                            minDate={moment(this.state.startDate).add(1,'day')}
                            maxDate={moment()}
                            inputValue={moment(this.state.endDate).format('DD/MM/YYYY')}
							onChange={handleDateChangeEnd}
							KeyboardButtonProps={{
								'aria-label': 'Fecha de inicio'
							}}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
                <Grid item xs={12}>
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
                            <MenuItem value={0}>
                                Mermas
                            </MenuItem>
                            <MenuItem value={1}>
                                Top 10 venta de recetas
                            </MenuItem>
                            <MenuItem value={2}>
                                Pedidos
                            </MenuItem>
                        </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Echarts option={this.state.chartConfig} notMerge={true}> 

                    </Echarts>
                </Grid>
			</Grid>
		);
	}
}

export default Charts;
