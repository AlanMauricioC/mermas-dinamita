import { SERVER_URL } from '../constants';
export const getStockNotifications = async () => {
	try {
		const response = await fetch(SERVER_URL + 'restockAlerts');
		if (!response.ok) {
			throw Error(response.statusText);
		}
		const json = await response.json()
		return json.restockAlerts ? json.restockAlerts : [];
	} catch (error) {
		console.error(error);
		return [];
	}
};
