import React, { useEffect, useState } from 'react'

const SummariesPage = ({ pageNumber }) => {
    const [summaries, setSummaries] = useState([]);
    const [toEdit, setToEdit] = useState(false);
    const [contentToEdit, setContentToEdit] = useState("");
    const [title, setTitle] = useState("");

    // fetching the summaries related to the specific page.
    useEffect(() => {
        try {
            fetch("http://127.0.0.1:8000/get_summaries_page", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({"page_number" : pageNumber})
            })
                .then(response => response.json())
                .then(data => {
                    setSummaries(data);
                });
        } catch (error) {
            console.error(error);
        }
    }, [pageNumber]);

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

    const handleOnClose = () => {
        setToEdit(false);
    };

    return (
        <div className="flex flex-wrap justify-center">
            {summaries.map((summary) => (
                <div key={summary.title} className="flex-initial w-64 bg-gray-700 p-2 text-white rounded m-1">
                    <div className="flex rounded bg-gray-800 justify-around">
                        <h2 className="text-lg">{summary.title}</h2>
                        <button className="bg-teal-600 hover:bg-teal-500 text-xs" onClick={() => {
                            setContentToEdit(summary.content);
                            setTitle(summary.title);
                            setToEdit(true);
                        }}>Edit</button>
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
    )
}

export default SummariesPage
