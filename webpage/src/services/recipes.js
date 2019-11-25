import { SERVER_URL } from '../constants';
export const getRecipes = async function(search, state) {
	try {
		const response = await fetch(SERVER_URL + `getRecipes`, {
			method: 'POST',
			body: JSON.stringify({ search, state }),
			headers: {
				'Content-Type': 'application/json',
				token: sessionStorage.getItem('token')
			}
		});
		if (!response.ok) {
			throw Error(response.statusText);
		}
		const json = await response.json();
		json.recipes.map((recipe) => {
			recipe.imageRecipe = SERVER_URL + recipe.imageRecipe;
			return recipe;
		});

		return json;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const updateRecipes = async function(recipe) {
	const formData = new FormData();
	formData.append('idRecipe', recipe.idRecipe);
	formData.append('nameRecipe', recipe.nameRecipe);
	if (recipe.idSupply) {
		formData.append('idSupply', recipe.idSupply);
	}
	formData.append('detailRecipe', recipe.detailRecipe);
	formData.append('image', recipe.file);
	formData.append('supplies', JSON.stringify(recipe.supplies));
	formData.append('statusRecipe', recipe.statusRecipe);

	try {
		const response = await fetch(SERVER_URL + `updateRecipe`, {
			method: 'POST',
			body: formData,
			headers: {
				'Content-Type': 'application/json',
				token: sessionStorage.getItem('token')
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
	const formData = new FormData();
	formData.append('nameRecipe', recipe.nameRecipe);
	if (recipe.idSupply) {
		formData.append('idSupply', recipe.idSupply);
	}
	formData.append('detailRecipe', recipe.detailRecipe);
	formData.append('image', recipe.file);
	console.log(recipe);

	formData.append('supplies', JSON.stringify(recipe.supplies));

	try {
		const response = await fetch(SERVER_URL + `insertRecipe`, {
			method: 'POST',
			body: formData,
			headers: {
				'Content-Type': 'application/json',
				token: sessionStorage.getItem('token')
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
				'Content-Type': 'application/json',
				token: sessionStorage.getItem('token')
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
				'Content-Type': 'application/json',
				token: sessionStorage.getItem('token')
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

export const insertRecipeSupply = async function(idRecipe, idSupply, quantity) {
	try {
		const response = await fetch(SERVER_URL + `insertSupplyRecipe`, {
			method: 'POST',
			body: JSON.stringify({
				idRecipe,
				idSupply,
				quantity
			}),
			headers: {
				'Content-Type': 'application/json',
				token: sessionStorage.getItem('token')
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

export const updateSupplyRecipe = async function(quantity, idRecipe, idSupply) {
	try {
		const response = await fetch(SERVER_URL + `updateSupplyRecipe`, {
			method: 'POST',
			body: JSON.stringify({ quantity, idRecipe, idSupply }),
			headers: {
				'Content-Type': 'application/json',
				token: sessionStorage.getItem('token')
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
