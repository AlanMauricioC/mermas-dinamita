import { SERVER_URL } from "../constants";

export const getConfig = (title='Título', dates=[], series=[]) => {
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
			data: dates,
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


export const getWasteChart=async (dateStart,dateEnd)=>{
	try {
		const response = await fetch(SERVER_URL + `stadisticWastes`, {
			method: 'POST',
			body: JSON.stringify({ dateStart,dateEnd }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			throw Error(response.statusText);
		}
		const json = await response.json();
		console.log(json);

		return json;
	} catch (error) {
		console.log(error);
		return [];
	}
}