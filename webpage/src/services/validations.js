export { validateText, validateNumber };
// import alertify from 'alertifyjs'

/**
 * 
 * @param {string} value texto a validar
 * @param {Number} max longitud maxima del texto (opcional)
 * @param {Number} min longitud minima del texto (opcional)
 * @param {string} regexp expresión regular para validar (opcional)
 * @returns {boolean} true si es valido
 */
function validateText(value, min, max, regexp) {
	let validated = true;
	if (typeof value!== 'undefined') {
		if (max) {
			if (value.length > max) validated = false;
		}
		if (min || min === 0) {
			if (value.length < min) validated = false;
		}

		if (regexp) {
			if (!regexp.test(value)) validated = false;
		}
	}else{
		validated=false
	}

	return validated;
}

/**
 * 
 * @param {Number} value texto a validar
 * @param {Number} max longitud maxima del texto (opcional)
 * @param {Number} min longitud minima del texto (opcional)
 * @returns {boolean} true si es valido
 */
function validateNumber(value, min, max) {
	let validated = true;

	if (value.isNaN) {
		validated = false;
	}
	if (max) {
		if (value > max) validated = false;
	}
	if (min || min === 0) {
		if (value < min) validated = false;
	}

	return validated;
}

export function isValidEmail(email) { 
    return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email); 
}

export function isValidPassword(password) { 
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])([A-Za-z\d$@$!%*?&]|[^ ]){8,45}$/.test(password); 
}