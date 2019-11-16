import {APP_KEY, REQUEST_URL} from "./constants";

export const getRecipeList = async (requestString) => {
    const objectToSend = {
        query: requestString,
    };

    const rawResponse = await fetch(`${REQUEST_URL}/v1/suggestions/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Ocp-Apim-Subscription-Key': APP_KEY,
        },
        body: JSON.stringify(objectToSend),
    });
    return await rawResponse.json();
};