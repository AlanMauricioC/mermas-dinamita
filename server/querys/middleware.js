// middleware para control de sesiones de administrador
function middlewareOnlyAdmin(req, res, next) {
	if(req.session.idUser) {
		if(req.session.rol == 0) {
			next()
		}
		else {
			res.status(500).json('Error, usuario no valido')
		}
    }
    else {
    	res.status(500).json('Error, sesion no iniciada o expirada')
    }
} 

// middleware para control de sesiones de chef
function middlewareOnlyChef (req, res, next) {
	if(req.session.idUser) {
		if(req.session.rol == 1) {
			next()
		}
		else {
			res.status(500).json('Error, usuario no valido')
		}
    }
    else {
    	res.status(500).json('Error, sesion no iniciada o expirada')
    }
}

// middleware para control de sesiones para administrador y chef
function middleware (req, res, next) {
	if(req.session.idUser) {
		if(req.session.rol == 0 || req.session.rol == 1) {
			next()
		}
		else {
			res.status(500).json('Error, usuario no valido')
		}
    }
    else {
    	res.status(500).json('Error, sesion no iniciada o expirada')
    }
}

module.exports = {
	middlewareOnlyAdmin,
	middlewareOnlyChef, 
	middleware
}