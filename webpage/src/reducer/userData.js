const defaultState = {
	name: '',
	rol,
	id
};

const userData = (state = defaultState, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, name: action.payload };
		
		default:
			return state;
	}
};

export default userData;