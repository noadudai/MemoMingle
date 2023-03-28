/* Destructuring the useState and useEffect from the "react" object into the 
useState ans useEffect variables. */
import React, { useState, useEffect } from "react";

import EditSummaryModel from "./EditSummaryModel";

// Arrow function assigned to the variable SummariesList.
const SummariesList = () => {
    // Destructuring the useState's array return value into the first and second elements in the array.
    const [summaries, setSummaries] = useState([]);
    const [toEdit, setToEdit] = useState(false);
    const [selectedSummary, setSelectedSummary] = useState(null);

    useEffect(() => {
        try {
            fetch("http://127.0.0.1:8000/show_all_summaries")
                .then(response => response.json())
                .then(data => setSummaries(JSON.parse(data)));

            } catch (error) {
                console.error(error);
            }
    });

    const handleOnClose = () => {
        setToEdit(false);
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
                            <button className="text-xs" onClick={()=> {
                                setToEdit(true)
                                setSelectedSummary(summary)
                            }}>Edit</button>
                       </div>
                        <p className="whitespace-pre-wrap">{summary.content}</p>
                        <EditSummaryModel onClose={handleOnClose} visible={toEdit} summary={selectedSummary}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SummariesList;
