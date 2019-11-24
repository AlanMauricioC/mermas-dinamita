const defaultState = {
    name: ''
};

const userData = (state = defaultState, action) => {
	switch (action.type) {
		case 'DELETE_SUPPLY':
			const deleted = state.supplies.filter((supply) => supply.id !== action.payload.id);
			return { ...state, supplies: deleted };
		case 'UPDATE_SUPPLY':
			const updated = state.supplies.map(
				(supply) => (supply.id === action.payload.supply.id ? action.payload.supply : supply)
			);
			return { ...state, supplies: updated };
		case 'SET_SUPPLIES':
			return { ...state, supplies: action.payload };
		
		default:
			return state;
	}
};

export default userData;