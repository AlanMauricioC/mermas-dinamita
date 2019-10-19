const reducer = (state = [], action) => {

    switch (action.type) {
        case 'DELETE_RECIPE':
            return state.filter(recipe=>recipe.idRecipe!==action.payload.idRecipe)
        case 'UPDATE_RECIPE':
            const updated = state.map(recipe => recipe.idRecipe === action.payload.recipe.idRecipe ? action.payload.recipe : recipe)
            return updated
        case 'SET_RECIPES':
            return action.payload
        default:
            return state
    }

}

export default reducer