/* Destructuring the useState and useEffect from the "react" object into the 
useState ans useEffect variables. */
import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

// Arrow function assigned to the variable SummariesList.
const SummariesList = () => {
    // Destructuring the useState's array return value into the first and second elements in the array.
    const [summaries, setSummaries] = useState([]);
    const [toEdit, setToEdit] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    const [contentToEdit, setContentToEdit] = useState("");
    const [title, setTitle] = useState("");
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        try {
            fetch("http://127.0.0.1:8000/show_all_summaries")
                .then(response => response.json())
                .then(data => {
                    setSummaries(JSON.parse(data));
                    setNumberOfPages(Math.ceil(summaries/itemsPerPage));
                });
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
        .then(() => {window.location.reload()})
        .catch(error => console.error(error));

        handleOnClose();
    };

    const handleDeleteButton = (title_to_delete) => {
        
        const delete_summary = {
            "summary_name" : title_to_delete
        }

        fetch("http://127.0.0.1:8000/delete_summary", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(delete_summary)
        }).then(response => response.json())
        .then(data => console.log(data))
        .then(() => {window.location.reload()})
        .catch(error => console.error(error));
    };

    const edited_summary = {
        "summary_name" : title,
        "summary" : contentToEdit
    };

    // for example, page 4. 4 * 10 = 40 (the last indexs of that page's summery)
    const endSummaryIndex = currentPage * itemsPerPage;

    // last index - 10 (the items per page) will give the first item to that page.
    const startSummaryIndex = endSummaryIndex - itemsPerPage;

    // extructs the summaries of the current page.
    const summariesPaging = summaries.slice(startSummaryIndex, endSummaryIndex);
    
    return (
        <div className="dark pt-28 bg-gray-900">
            <div className="flex justify-center">
                <div className="flex-initial w-64 text-center bg-gray-800 text-white rounded">
                    <p className="p-2 text-2xl">Summaries</p>    
                </div>
            </div>
            <div className="flex flex-wrap justify-center">
                {summariesPaging.map((summary) => (
                    <div key={summary.title} className="flex-initial w-64 bg-gray-700 p-2 text-white rounded m-1">
                        <div className="flex rounded bg-gray-800 justify-around">
                            <h2 className="text-lg">{summary.title}</h2>
                            <button className="bg-teal-600 hover:bg-teal-500 text-xs" onClick={() => {
                                setContentToEdit(summary.content);
                                setTitle(summary.title);
                                setToEdit(true);
                                setLastUpdated(Date.now());}}>Edit</button>
                       </div>
                       {toEdit === false ?
                            <p className="whitespace-pre-wrap pt-2 pb-2">{summary.content}</p>
                            :
                            <div className="flex justify-center inset-0 bg-opacity-30 backdrop-blur-sm fixed items-center">
                            <div className="bg-gray-700 p-2 rounded text-white flex-col">
                                <div>
                                    <h2 className="text-lg">{title}</h2>
                                    <textarea
                                        className="appearance-none border rounded w-full py-2 px-3 bg-gray-600 leading-tight"
                                        id="content"
                                        rows="5"
                                        value={contentToEdit}
                                        onChange={(e) => setContentToEdit(e.target.value)}>
                                    </textarea>
                                </div>
                                <button className="bg-teal-600 hover:bg-teal-500 text-xs" onClick={handleEditButton}>Submit changes</button>
                            </div>
                        </div>
                        }
                    <button className="text-xs bg-red-500 hover:bg-red-400 m-2" onClick={() => {
                        handleDeleteButton(summary.title);
                    }}>Delete</button>
                    </div>
                ))}
            </div>
            {/* <Pagination 
                itemsPerPage={itemsPerPage}
                totalitems={numberOfPages}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)} /> */}
        </div>
    )
}

export default SummariesList;
