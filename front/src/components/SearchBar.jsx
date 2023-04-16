import React, { useEffect, useState } from 'react'

const SearchBar = () => {
    const [titleToSearch, setTitleToSearch] = useState("");
    const [summaries, setSummaries] = useState([]);
    const [titleChanged, settitleChanged] = useState(titleToSearch);
    const [isDropDown, setIsDropDown] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/search_title", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "title": titleToSearch })
        }).then(response => response.json())
            .then(data => setSummaries(data))
            .catch(error => console.error(error));
    }, [titleChanged]);

    const toggleDown = () => {
        // if true then it'll be false, if false it'll be true
        setIsDropDown(!isDropDown);
    }

    return (
        <div className="relative">
            <div className="relative">
                <div className='flex items-end'>
                    <button
                        onClick={toggleDown}
                        className="absolute top-1 p-1 right-0 bg-gray-700 rounded-lg text-white hover:bg-gray-600"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Search Summary"
                    className="border border-gray-300 rounded-lg py-2 px-4 bg-gray-700 text-white"
                    value={titleToSearch}
                    onChange={(e) => {
                        setTitleToSearch(e.target.value);
                        settitleChanged(e.target.value);
                    }}
                />
            </div>
            {/* create a dropdown with max limit for scrolling, that uses the isopen 
                to determin if the dropdown should open. And show the responsed 
                list of summaries that relate to the title given.
             */}
        </div>
    )
}

export default SearchBar;
