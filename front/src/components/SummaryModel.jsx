import React from 'react'

const SummaryModel = ({article, visible, onClose}) => {
    
    if (!visible) return null;
    
    return (
        <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-gray-700 p-2 text-white flex flex-col mx-20 mr-20 rounded-md px-3 m-[1.5px] drop-shadow-lg'>
                <div className="flex justify-center items-center">
                    <button onClick={onClose} className="text-xs">X</button>
                </div>
                <p className='bg-gray-600 p-2 rounded'>{article.content}</p>
            </div>
        </div>
    );
}

export default SummaryModel;