import React, { useEffect, useState } from 'react'

const Pagination = () => {
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    const [summariesList, setSummariesList] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [summariesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [toEdit, setToEdit] = useState(false);
    const [contentToEdit, setContentToEdit] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/show_all_summaries")
            .then(response => response.json())
            .then(data => setSummariesList(JSON.parse(data)))
            .catch(error => console.error(error));
        
        setNumberOfPages(Math.ceil(summariesList.length / summariesPerPage));
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

    const startSummaryIndex = currentPage * summariesPerPage;
    const endSummaryIndex = startSummaryIndex + summariesPerPage;
    const summariesInPage = summariesList.slice(startSummaryIndex, endSummaryIndex)
            .map((summary) => {
                return (<div>{summary.title}</div>)})

    return (
        // padding-top so it'll show under the navBar.
        <div className='pt-28 flex flex-wrap justify-center'>
            {summariesInPage}
        </div>
    )
}

export default Pagination