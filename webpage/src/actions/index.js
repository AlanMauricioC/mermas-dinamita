export const open = (idCategory) => {
    return {
        type: 'OPEN',
        payload: { idCategory}
    }
}

export const menuOption = (option) => {
    return {
        type: 'MENU_OPTION',
        payload: option
    }
}

export const menuOpen = (open) => {
    return {
        type: 'MENU_OPEN',
        payload: open
    }
}


export const deleteSupply=(supply)=>{
    return {
        type: 'DELETE_SUPPLY',
        payload:supply
    }
}

export const updateSupply = (supply) => {
    return {
        type: 'UPDATE_SUPPLY',
        payload: supply
    }
}
export const insertSupply = (supply) => {
    return {
        type: 'INSERT_SUPPLY',
        payload: supply
    }
}

export const setSupplies = (supplies) => {
    return {
        type: 'SET_SUPPLIES',
        payload: supplies
    }
}

export const setSuppliesSearch = (search) => {
    return {
        type: 'SET_SEARCH',
        payload: search
    }
}

export const setSupplySelector = (selector) => {
    return {
        type: 'SET_SUPPLY_SELECTOR',
        payload: selector
    }
}

export const deleteRecipe=(recipe)=>{
    return {
        type: 'DELETE_RECIPE',
        payload:recipe
    }
}

export const updateRecipe = (recipe) => {
    return {
        type: 'UPDATE_RECIPE',
        payload: recipe
    }
}
export const insertRecipe = (recipe) => {
    return {
        type: 'INSERT_RECIPE',
        payload: recipe
    }
}

export const setRecipes = (recipes) => {
    return {
        type: 'SET_RECIPES',
        payload: recipes
    }
}


export const signIn = (recipes) => {
    return {
        type: 'SIGN_IN',
    }
}

export const signOut = (recipes) => {
    return {
        type: 'SIGN_OUT',
    }
}