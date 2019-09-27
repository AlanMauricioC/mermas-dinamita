const initialState = {
    open: false,
    option: 'products'
}

const menuReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'MENU_OPEN':
            const open = action.payload
            return {...state,open}
        case 'MENU_OPTION':
            const option = action.payload
            return { ...state, option }
        default:
            return state
    }

}

export default menuReducer