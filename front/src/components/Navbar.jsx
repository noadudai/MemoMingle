import React, {useState} from "react";

import CreateSummaryButton from "./CreateSumButton";
/* 
The button:
bg-transparent border-orange-700 hover:bg-orange-700 
*/

// the following is a magnifying-glass icon
{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
 */}

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const [isMoodelOpen, setIsModalOpen] = useState(false);

    const handleClick = () => setMenu(!menu);

    return (
        <div className="dark w-screen h-[80px] z-10 bg-gray-800 fixed drop-shadow-lg top-0">
            <div className='px-2 flex justify-between  w-full h-full'>
                <div className="flex items-center justify-around">
                    <h1 className="text-xl mr-4 font-bold sm:text-4xl text-white">Memo Mingle</h1>
                    <button className="text-white bg-teal-600 hover:bg-teal-500" onClick={() => setIsModalOpen(true)}>Create Summary</button> 
                    <CreateSummaryButton isOpen={isMoodelOpen} onClose={() => setIsModalOpen(false)}/>
                </div>
            </div>
        </div>
    );
}

export default Navbar