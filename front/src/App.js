import React from 'react';
import Navbar from "./components/Navbar"
import SummariesList from './components/SummariesList';

// TODO: Import react-router-dom and all that is necessary for routing.
// TODO: Change the return statement to support routing to the search result component. 
// And the "home Page".  

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
