/* Destructuring the useState and useEffect from the "react" object into the 
useState ans useEffect variables. */
import React, { useState, useEffect } from "react";

// Arrow function assigned to the variable SummariesList.
const SummariesList = () => {
    // Destructuring the useState's array return value into the first and second elements in the array.
    const [summaries, setSummaries] = useState([]);
    const [toEdit, setToEdit] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        try {
            fetch("http://127.0.0.1:8000/show_all_summaries")
                .then(response => response.json())
                .then(data => setSummaries(JSON.parse(data)));
        } catch (error) {
            console.error(error);
        }
    }, [lastUpdated]); 

    const handleOnClose = () => {
        setToEdit(false);
    };

    const handleEditButton = () => {
        fetch("http://127.0.0.1:8000/edit_summary", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(edited_summary)
        }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

        handleOnClose();
    };

    const edited_summary = {
        "summary_name" : title,
        "summary" : content
    };

    return (
        <div className="dark pt-28 bg-gray-900">
            <div className="flex justify-center">
                <div className="flex-initial text-center bg-gray-800 text-white rounded">
                    <p className="pt-2 py-2 p-40 text-2xl">Summaries</p>    
                </div>
            </div>
            <div className="flex flex-wrap justify-center">
                {summaries.map((summary) => (
                    <div key={summary.title} className="flex-initial w-64 bg-gray-700 p-2 text-white rounded m-1">
                       <div className="flex rounded pt-2 py-2 bg-gray-800 justify-around">
                            <h2 className="text-lg">{summary.title}</h2>
                            <button className="text-xs" onClick={() => {
                                setContent(summary.content);
                                setTitle(summary.title);
                                setToEdit(true);
                                setLastUpdated(Date.now());}}>Edit</button>
                            <button className="text-xs bg-red-500 hover:bg-red-400">Delete</button>
                       </div>
                       {toEdit === false ?
                            <p className="whitespace-pre-wrap">{summary.content}</p>
                        :
                        <div className="flex justify-center inset-0 bg-opacity-30 backdrop-blur-sm fixed items-center">
                            <div className="bg-gray-700 p-2 rounded text-white flex-col">
                                <div>
                                    <h2 className="text-lg">{title}</h2>
                                    <textarea
                                        className="appearance-none border rounded w-full py-2 px-3 bg-gray-600 leading-tight"
                                        id="content"
                                        rows="5"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}>
                                    </textarea>
                                </div>
                                <button onClick={handleEditButton}>Submit changes</button>
                            </div>
                        </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SummariesList;
