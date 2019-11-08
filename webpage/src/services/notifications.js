import { SERVER_URL } from '../constants';
export const getStockNotifications = async () => {
	try {
		const response = await fetch(SERVER_URL + 'alerts');
		if (!response.ok) {
			throw Error(response.statusText);
		}
		const json = await response.json();
		return json;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const deleteExpirationNotification = async (id) => {
	//datos default para eliminar notificacion de expiración
	const type = 'supply';
	const typeNotification = 1;
	try {
		const response = await fetch(SERVER_URL + `deleteAlert`, {
			method: 'POST',
			body: JSON.stringify({ type, id, typeNotification }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			throw Error(response.statusText);
		}
		const json = await response.json();
		console.log(json);

		return json;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const deleteStockNotification = async (id) => {
	//datos default para eliminar notificacion de expiración
	const type = 'supply';
	const typeNotification = 2;
	try {
		const response = await fetch(SERVER_URL + `deleteAlert`, {
			method: 'POST',
			body: JSON.stringify({ type, id, typeNotification }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};
