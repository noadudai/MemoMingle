import React, { useState } from "react";

const CreateSummaryButton = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleCreateSummary = () => {
        const new_summary = {
            "summary_name": title,
            "summary": content
        }

        const response = fetch("http://127.0.0.1:8000/create_summary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(new_summary)
        }).then(() => { window.location.reload() });

        onClose();
        setContent("");
        setTitle("");
        console.log(response.data);

    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="flex flex-wrap justify-center">
            <div className="flex pt-64 justify-center inset-0 bg-opacity-30 backdrop-blur-sm fixed items-center">
                <div className="bg-gray-700 p-2 rounded text-white flex-col">
                    <div class="relative mb-3 xl:w-96" data-te-input-wrapper-init>
                        <input
                            type="text"
                            id="title"
                            class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline mt-2 mb-2"
                            placeholder="Summery Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />

                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline mt-2 mb-2"
                            id="content"
                            rows="5"
                            placeholder="Summary Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}>
                        </textarea>

                    </div>
                    <div class="flex justify-center space-x-2" onClick={handleCreateSummary}>
                        <button className="text-white bg-teal-600 hover:bg-teal-500">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateSummaryButton