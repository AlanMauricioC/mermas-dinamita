export const getConfig = (title='Título', titles=[], series=[]) => {
	const defSerie = {
		type: 'line',
		smooth: true,
		areaStyle: {},
		// name: 'nombre1',
		// data: [ 1, 2, 3, 4 ]
    };
    
    series.map(({name='Nombre',data=[]})=>({...defSerie,data,name}))


	return {
		tooltip: {
			trigger: 'axis',
			confine: true
        },
        title:{
            text:title
        },

		// axisLabel: {
		//   formatter(value) {
		//     return moment(value).format('D')
		//   }
		// },

		grid: {
			bottom: '13%',
			top: 35
		},
		dataZoom: {
			show: true,
			type: 'slider',
			y: '88%'
		},

		xAxis: {
			show: true,
			boundaryGap: false,
			type: 'category',
			position: 'top',
			nameLocation: 'center',
			//   data: data.map(function(item) {
			//     return item[0];
			//   }),
			data: [ 'fecha1', 'fecha2', 'fecha3', 'fecha4', 'fecha5' ],
			axisLine: {
				show: true
			},

			axisTick: {
				show: false
			},

			splitLine: {
				interval: 1
			},

			axisLabel: {
				//intervalo entre fechas
				interval: 3
			}
		},

		yAxis: {
			show: true,
			type: 'value'
		},
		//información 
		series
	};
};
