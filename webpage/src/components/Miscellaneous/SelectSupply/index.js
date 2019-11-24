import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function mapStateToProps(state) {
	return {
		supplies: state.supplies.supplies
	};
}

class SelectSupply extends PureComponent {
	constructor(props) {
		super(props);

		const value = props.supplies.find((supply) => supply.id === props.value);
		this.state = {
			value: value || { name: 'Ninguno', id: -1 }
		};
    }
    
	componentDidUpdate() {
		const value = this.props.supplies.find((supply) => supply.id === this.props.value);
		if (value) {
            this.setState({value})
        }
	}

	render() {
		const handleOnChange = (e, newValue) => {
			let newEvent;
			if (newValue) {
				newEvent = { target: { value: newValue.id } };
			} else {
				newEvent = { target: { value: -1 } };
			}
			this.props.onChange(newEvent);
		};
		return (
			<Autocomplete
				options={this.props.supplies}
				id="controlled-demo"
				getOptionLabel={(option) => option.name}
				onChange={handleOnChange}
				value={this.state.value}
				renderInput={(params) => <TextField {...params} label={this.props.label||"Insumos"} fullWidth margin="normal" />}
			/>
		);
	}
}

export default connect(mapStateToProps)(SelectSupply);
