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