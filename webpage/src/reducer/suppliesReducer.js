import { SUPPLY_SELECTOR } from "../constants";

const defaultState = {
	supplies: [],
    qry: '',
    type:SUPPLY_SELECTOR.NONE,
};

const menuReducer = (state = defaultState, action) => {
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
		case 'SET_SEARCH':
			return { ...state, qry: action.payload,type:SUPPLY_SELECTOR.NONE };
		default:
			return state;
	}
};

export default menuReducer;
