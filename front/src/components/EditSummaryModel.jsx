import React, {useState} from "react";

const EditSummaryModel = ({summary, visible, onClose}) => {
    const [content, setContent] = useState("");
    
    if (!visible) return null;

    const edited_summary = {
        "summary_name" : summary.title,
        "summary" : content
    }

    const handleEditButton = () => {
        fetch("http://127.0.0.1:8000/edit_summary", {
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(edited_summary)
        })

        onClose();
    }

    // return (
    //     <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
    //         <div className='bg-gray-700 p-2 text-white flex flex-col mx-20 mr-20 rounded-md px-3 m-[1.5px] drop-shadow-lg'>
    //             <div className="flex justify-center items-center">
    //                 <button onClick={onClose} className="text-xs">X</button>
    //             </div>
    //             <p className='bg-gray-600 p-2 rounded'>{article.content}</p>
    //         </div>
    //     </div>
    // );


    return (
        <div className="flex justify-center inset-0 bg-opacity-30 backdrop-blur-sm fixed items-center">
            <div className="bg-gray-700 p-2 rounded text-white flex-col">
                <div>
                    <h2 className="text-lg">{summary.title}</h2>
                    <textarea
                        className="appearance-none border rounded w-full py-2 px-3 bg-gray-600 leading-tight"
                        id="content"
                        rows="5"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}>
                    </textarea>
                </div>
                <button onClick={handleEditButton}>Submit changes</button>
            </div>
        </div>
    )
}

export default EditSummaryModel;