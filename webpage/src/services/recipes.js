import { SERVER_URL } from '../constants';
export const getRecipes = async function(search, state) {
	try {
		const response = await fetch(SERVER_URL + `getRecipes`, {
			method: 'POST',
			body: JSON.stringify({ search, state }),
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

export const updateRecipes = async function(recipe) {
	try {
		const response = await fetch(SERVER_URL + `updateRecipe`, {
			method: 'POST',
			body: JSON.stringify(recipe),
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

export const insertRecipes = async function(recipe) {
	try {
		const response = await fetch(SERVER_URL + `insertRecipe`, {
			method: 'POST',
			body: JSON.stringify(recipe),
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

export const deleteRecipes = async function(recipe) {
	try {
		const response = await fetch(SERVER_URL + `deleteRecipe`, {
			method: 'POST',
			body: JSON.stringify(recipe),
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

export const deleteRecipeSupply = async function(idRecipe, idSupply) {
	try {
		const response = await fetch(SERVER_URL + `deleteSupplyRecipe`, {
			method: 'POST',
			body: JSON.stringify({
				idRecipe,
				idSupply
			}),
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

export const insertRecipeSupply = async function(idRecipe, idSupply,quantity) {
	try {
		const response = await fetch(SERVER_URL + `insertSupplyRecipe`, {
			method: 'POST',
			body: JSON.stringify({
				idRecipe,
                idSupply,
                quantity
			}),
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
