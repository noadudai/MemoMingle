import React from "react";

import {MenuIcon} from '@heroicons/react/outline'

const Navbar = () => {
    return (
        <div className="w-screen h-20 z-10 bg-stone-500 fixed drop-shadow-lg">
            <div className="px-2 flex justify-between items-center w-full h-full">
                <div className="flex items-center">
                    <h1 className="text-xl font-bold mr-4 sm:text-4xl">Memo Mingle</h1>
                    <ul className="hidden md:flex">
                        <li>Create Summary</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Navbar