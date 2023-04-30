// TODO: Add "Link" to the "home page" and the "search result page".

import React, { useState } from "react";

import CreateSummaryButton from "./CreateSumButton";
import SearchBar from "./SearchBar";

const Navbar = () => {
    const [isMoodelOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-screen bg-gray-800 fixed drop-shadow-lg ">
            <div className="p-4 flex justify-around ">
                <h1 className="text-xl font-bold sm:text-4xl text-white">Memo Mingle</h1>
                <button className="text-white bg-teal-600 hover:bg-teal-500" onClick={() => setIsModalOpen(true)}>Create Summary</button>
                <CreateSummaryButton isOpen={isMoodelOpen} onClose={() => setIsModalOpen(false)} />
                <SearchBar />
            </div>
        </div>
    );
}

export default Navbar