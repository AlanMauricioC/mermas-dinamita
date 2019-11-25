import { SERVER_URL } from "../constants";
export const getSupplies = async function (search,state) {
    try {
        const response = await fetch(SERVER_URL +`getSupplies`,{
            method: 'POST',
            body: JSON.stringify({search, state}),
            headers: {
                'Content-Type': 'application/json',
                'token':sessionStorage.getItem('token')
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

export const updateSupplies = async function (supply) {
    try {
        const response = await fetch(SERVER_URL + `updateSupply`, {
            method: 'POST',
            body: JSON.stringify(supply),
            headers: {
                'Content-Type': 'application/json',
                'token':sessionStorage.getItem('token')
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export const insertSupplies = async function (supply) {
    try {
        const response = await fetch(SERVER_URL + `insertSupply`, {
            method: 'POST',
            body: JSON.stringify(supply),
            headers: {
                'Content-Type': 'application/json',
                'token':sessionStorage.getItem('token')
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}


export const deleteSupplies = async function (supply) {
    try {
        const response = await fetch(SERVER_URL + `deleteSupply`, {
            method: 'POST',
            body: JSON.stringify(supply),
            headers: {
                'Content-Type': 'application/json',
                'token':sessionStorage.getItem('token')
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}