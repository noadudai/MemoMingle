// TODO: Change this component to receive the list of the summaries to display.
// So that I will be able to reuse this component in different "pages" such as "home page" and "search result page".



/* Destructuring the useState and useEffect from the "react" object into the 
useState ans useEffect variables. */
import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import SummariesPage from "./SummariesPage";

// Arrow function assigned to the variable SummariesList.
const SummariesList = () => {
    // Destructuring the useState's array return value into the first and second elements in the array.
    const [itemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalSummaries, setTotalSummaries] = useState(1);


    useEffect(() => {

        fetch("http://127.0.0.1:8000/get_number_of_summaries")
            .then(response => response.json())
            .then(data => {
                setTotalSummaries(JSON.parse(data).count)})
            .catch(error => console.error(error));

     },[]);

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    return (
        <div className="dark pt-28 bg-gray-900">
            <div className="flex justify-center">
                <div className="flex-initial w-64 text-center bg-gray-800 text-white rounded">
                    <p className="p-2 text-2xl">Summaries</p>
                </div>
            </div>
            <SummariesPage pageNumber={currentPage} />
            <Pagination
                itemsPerPage={itemsPerPage}
                totalitems={totalSummaries}
                currentPage={currentPage}
                onPageChange={changePage} />
        </div>
    )
}

export default SummariesList;
