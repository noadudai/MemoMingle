import React, { useState, useEffect } from "react";

const SummariesList = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  console.log(typeof articles)
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

    return (
        <div class="relative inline-block text-left">
            {articles.map((article) => (
                <button
                key={article.id}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                    // code to show article content goes here
                    handleItemClick(article)
                }}
                >
                {article.title}
                </button>
            ))}
            {selectedArticle && (
                <Dropdown
                title={selectedArticle.title}
                items={[{ content: selectedArticle.content }]}
                />
            )}
        </div>
    )
}

export default SummariesList;;