import { SERVER_URL } from "../constants";

export const login = async function (user) {
    try {
        const response = await fetch(SERVER_URL +`public/logIn`,{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        if (json.token) {
            sessionStorage.setItem('token',json.token)
        }
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}

export const sesion = async function(){
    try {

        const response = await fetch(SERVER_URL +`getSession`,{
            method: 'GET',
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

export const logout = async function(){
    try {

        const response = await fetch(SERVER_URL +`logOut`,{
            method: 'GET',
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