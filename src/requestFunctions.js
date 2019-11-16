import {API_VER, APP_KEY, JSON_TYPE, REQUEST_URL, STORES_SEARCH_DISTANCE, STUB_LOCATION} from "./constants";

export const getRecipeList = async (requestString) => {
    const objectToSend = {
        query: requestString,
    };

    const rawResponse = await fetch(`${REQUEST_URL}/${API_VER}/suggestions/recipes`, {
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

    const rawResponse = await fetch(`${REQUEST_URL}/${API_VER}/search/recipes`, {
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

export const getStoresNearby = async () => {
    const objectToSend = {"filters": {
            "locationDistance" : {
                "location": STUB_LOCATION,
                "distance": STORES_SEARCH_DISTANCE,
            }
        }
    };

    const rawResponse = await fetch(`${REQUEST_URL}/${API_VER}/search/stores`, {
        method: 'POST',
        headers: {
            'Content-Type': JSON_TYPE,
            'Ocp-Apim-Subscription-Key': APP_KEY,
        },
        body: JSON.stringify(objectToSend),
    });
    return await rawResponse.json();
};