import { SERVER_URL } from "../constants";

export const getProviders =async function () {
    try {
        const response = await fetch(`${SERVER_URL}providers`,{
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
        return null
    }
}