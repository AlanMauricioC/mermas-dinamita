const logged = (state = false, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return true
        case 'SIGN_OUT':
            return true
        default:
            return state
    }

}

export default logged
