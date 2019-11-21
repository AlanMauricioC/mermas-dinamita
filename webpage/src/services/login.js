import { SERVER_URL } from "../constants";

export const login = async function (user) {
    try {
        console.log(user);
        const response = await fetch(SERVER_URL +`logIn`,{
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
        console.log("response "+json.user.id);

        return json;
    } catch (error) {
        console.log(error);
        return []
    }
}