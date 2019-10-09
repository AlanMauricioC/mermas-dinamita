import { SERVER_URL } from "../constants";

export const getUnits = async function () {
    try {
        const response = await fetch(SERVER_URL + `getUnits`);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json.units);

        return json.units;
    } catch (error) {
        console.log(error);
        return []
    }
}