function isValidEmail(email) { 
    return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email); 
}

function isValidPassword(password) { 
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])([A-Za-z\d$@$!%*?&]|[^ ]){8,45}$/.test(password); 
}

module.exports = {
    isValidEmail,
    isValidPassword
}