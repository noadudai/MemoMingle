import React, {useState} from "react";

import CreateSummaryButton from "./CreateSumButton";
/* 
The button:
bg-transparent border-orange-700 hover:bg-orange-700 
*/

const Navbar = () => {
    const [nav, setNav] = useState(false)
    const [isMoodelOpen, setIsModalOpen] = useState(false)

    const handleClick = () =>setNav(!nav)

    return (
        <div className="dark w-screen h-[80px] z-10 bg-gray-800 fixed drop-shadow-lg top-0">
            <div className='px-2 flex justify-between items-center w-full h-full'>
                <div className="flex items-center">
                    <h1 className="text-xl mr-4 font-bold sm:text-4xl text-white">Memo Mingle</h1>
                </div>
            </div>
            <div className='mr-4' onClick={handleClick}>
                {/* Menu Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
            </div>

            <div className={!nav ? "hidden" : "absolute bg-gray-800 px-8 flex flex-col my-4"}>
                    <button onClick={() => setIsModalOpen(true)}>Create Summary</button> 
                    <CreateSummaryButton isOpen={isMoodelOpen} onClose={() => setIsModalOpen(false)}/>
            </div>
        </div>
    ) 
}
export default Navbar