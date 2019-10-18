const reducer = (state = [], action) => {

    switch (action.type) {
        case 'DELETE_RECIPE':
            return state.filter(recipe=>recipe.id!==action.payload.id)
        case 'UPDATE_RECIPE':
            const updated = state.map(recipe => recipe.id === action.payload.recipe.id ? action.payload.recipe : recipe)
            return updated
        case 'SET_RECIPES':
            return action.payload
        default:
            return state
    }

}

export default reducer