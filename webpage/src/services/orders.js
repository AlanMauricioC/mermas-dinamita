import { SERVER_URL } from "../constants";

export const recipes=
[
    {
        idRecipe: 1, 
        nameRecipe: "Mole poblano", 
        supplies:[
            {idSupply: 3, quantityRecipeSupply: 0.200},
            {idSupply: 4, quantityRecipeSupply: 0.50},
        ]
    },
    {
        idRecipe: 2, 
        nameRecipe: "Tamales oaxaqueños", 
        supplies:[
            {idSupply: 5, quantityRecipeSupply: 2},
            {idSupply: 6, quantityRecipeSupply: 1},
        ]
    },
];

export const supplies=
[
    {idSupply: 1, nameSupply: "Azúcar"},
    {idSupply: 2, nameSupply: "Leche"},
];

export const wastes=
[
    {idWaste: 1, nameSupply: "Azúcar"},
];

export const getOrders =async function () {
    try {
        const response = await fetch(`http://localhost:3002/orders`);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.log(error);
        return null
    }
}

export const getRecipes = async function (search) {
    try {
        const response = await fetch(SERVER_URL +`getRecipes`,{
            method: 'POST',
            body: JSON.stringify({search}),
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
        return []
    }
}


export const insertOrder = async function (data) {
    const idRecipe=data.idRecipe;
    const idUser=data.idUser;
    
    const supplies=data.supplies;
    console.log(supplies)
    const supply=data.supply;
    try {
        const response = await fetch(SERVER_URL + `insertOrder`, {
            method: 'POST',
            body: JSON.stringify({idRecipe, idUser, supplies, supply}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }else{
            const json = await response.json();
            return json;
        }
        
    } catch (error) {
        console.log(error);
        return []
    }
}

export const updateSupplyOrder = async function (data) {
    try {
        const response = await fetch(SERVER_URL + `updateSupplyOrder`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }else{
            const json = await response.json();
            return json;
        }
        
    } catch (error) {
        console.log(error);
        return []
    }
}

export const insertSupplyOrder = async function (data) {
    try {
        const response = await fetch(SERVER_URL + `insertSupplyOrder`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }else{
            const json = await response.json();
            return json;
        }
        
    } catch (error) {
        console.log(error);
        return []
    }
}

export const deleteSupplyOrder = async function (data) {
    try {
        const response = await fetch(SERVER_URL + `deleteSupplyOrder`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }else{
            const json = await response.json();
            return json;
        }
        
    } catch (error) {
        console.log(error);
        return []
    }
}