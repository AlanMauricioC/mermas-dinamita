

const menuReducer = (state = [], action) => {

    switch (action.type) {
        case 'DELETE_SUPPLY':
            return state.filter(supply=>supply.id!==action.payload.id)
        case 'UPDATE_SUPPLY':
            const updated = state.map(supply => supply.id === action.payload.supply.id ? action.payload.supply : supply)
            return updated
        case 'SET_SUPPLIES':
            return action.payload
        default:
            return state
    }

}

export default menuReducer