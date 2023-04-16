import React, { useState } from "react";

import CreateSummaryButton from "./CreateSumButton";
import SearchBar from "./SearchBar";

const Navbar = () => {
    const [isMoodelOpen, setIsModalOpen] = useState(false);

    return (
        <div className="dark w-screen h-[80px] bg-gray-800 fixed drop-shadow-lg top-0">
            <div className="p-4 flex items-center justify-around">
                <h1 className="text-xl mr-4 font-bold sm:text-4xl text-white">Memo Mingle</h1>
                <button className="text-white bg-teal-600 hover:bg-teal-500" onClick={() => setIsModalOpen(true)}>Create Summary</button>
                <CreateSummaryButton isOpen={isMoodelOpen} onClose={() => setIsModalOpen(false)} />
                <SearchBar />
            </div>
        </div>
    );
}

export default Navbar