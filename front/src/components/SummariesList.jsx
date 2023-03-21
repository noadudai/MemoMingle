import React, { useState, useEffect } from "react";
import SummaryModel from "./SummaryModel";

const SummariesList = () => {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showSummaryModel, setShowSummaryModel] = useState(null);

    useEffect(() => {
        try {
            fetch("http://127.0.0.1:8000/show_all_summaries")
                .then(response => response.json())
                .then(data => setArticles(JSON.parse(data)));

            } catch (error) {
                console.error(error);
            }
    }, []);

    const handleItemClick = (item) => {
        setSelectedArticle(item);
    };

    const handleOnClose = () => {
        setShowSummaryModel(false);
    };

    return (
        // <div class="relative text-left flex flex-col">
        <div className="dark pt-28 bg-gray-900">
            <div className="text-center bg-gray-800 text-white flex flex-col rounded mx-20 mr-20">
                <p className="pt-2 py-2 ">Summaries</p>    
                
            </div>
            <div className="flex flex-col mx-20 mr-20 rounded-md px-3 m-[1.5px]">
                {articles.map((article) => (
                    <button
                    key={article.id}
                    onClick={() => {
                        handleItemClick(article)
                        setShowSummaryModel(true)
                    }}
                    >
                    {article.title}
                    </button>
                ))}
            </div>
            <SummaryModel onClose={handleOnClose} visible={showSummaryModel} article={selectedArticle}/>
        </div>

    )
}

export default SummariesList;
