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
