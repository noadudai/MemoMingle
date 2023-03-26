/* Destructuring the useState and useEffect from the "react" object into the 
useState ans useEffect variables. */
import React, { useState, useEffect } from "react";

// Arrow function assigned to the variable SummariesList.
const SummariesList = () => {
    // Destructuring the useState's array return value into the first and second elements in the array.
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        try {
            fetch("http://127.0.0.1:8000/show_all_summaries")
                .then(response => response.json())
                .then(data => setArticles(JSON.parse(data)));

            } catch (error) {
                console.error(error);
            }
    });

    return (
        <div className="dark pt-28 bg-gray-900">
            <div className="flex justify-center">
                <div className="flex-initial text-center bg-gray-800 text-white rounded">
                    <p className="pt-2 py-2 p-40 text-2xl">Summaries</p>    
                </div>
            </div>
            <div className="flex flex-wrap justify-center">
                {articles.map((article) => (
                    <div className="flex-initial w-64 bg-gray-700 p-2 text-white rounded m-1">
                        <h2 className="pt-2 py-2 bg-gray-800 text-center rounded text-lg">{article.title}</h2>
                        <p className="whitespace-pre-wrap">{article.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SummariesList;
