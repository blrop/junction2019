import {APP_KEY, JSON_TYPE, REQUEST_URL} from "./constants";

export const getRecipeList = async (requestString) => {
    const objectToSend = {
        query: requestString,
    };

    const rawResponse = await fetch(`${REQUEST_URL}/v1/suggestions/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': JSON_TYPE,
            'Ocp-Apim-Subscription-Key': APP_KEY,
        },
        body: JSON.stringify(objectToSend),
    });
    return await rawResponse.json();
};

export const getRecipe = async (id) => {
    const objectToSend = {
        "filters": { "ids": [id.toString()] },
    };

    const rawResponse = await fetch(`${REQUEST_URL}/v1/search/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': JSON_TYPE,
            'Ocp-Apim-Subscription-Key': APP_KEY,
        },
        body: JSON.stringify(objectToSend),
    });
    const response = await rawResponse.json();
    return response.results;
};