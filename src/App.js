import React from 'react';
import './App.css';

function App() {
    const appKey = 'e99065a211b3465f8b470a08d50d2ef1';

    const sendRequest = async () => {
        const objectToSend = {
            "query": "Car",
        };

        const response = await fetch(`http://localhost:3000/v1/suggestions/recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Ocp-Apim-Subscription-Key': appKey,
            },
            body: JSON.stringify(objectToSend),
        });
        const text = await response.text();
        console.log(text);
    };

    const sendRequest2 = async () => {
        
    };

    return (
        <div className="app">
            <button className="request-button" onClick={sendRequest}>Send 1</button>
            <button className="request-button" onClick={sendRequest2}>Send 2</button>
        </div>
    );
}

export default App;
