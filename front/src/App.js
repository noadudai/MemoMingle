import React from 'react';
import Navbar from "./components/Navbar"
import SummariesList from './components/SummariesList';


function App(){   
    return (
        <div className='bg-gray-900 max-h-screen'>
            <div className='flex-1'>
                <Navbar />
                <SummariesList />
            </div>
        </div>
    )
}

export default App;
