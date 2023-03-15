import React, { useState } from 'react';
import Navbar from "./components/Navbar"


function App1(){
    return (
        <>
            <Navbar />
        </>
    )
}

function App() {
    const [summary_name, setSummaryName] = React.useState('')
    const [summary, setSummary] = React.useState('')

    const HandleSubmit = (event) => {
        const new_summary = {
            "summary_name" : summary_name,
            "summary" : summary
        }

        const response = fetch("http://127.0.0.1:8000/create_summary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(new_summary)
        })

        console.log(response.data);
    }
    
    return (
    <form onClick={HandleSubmit}>
        <label>
          Summary Name:
          <input type="text" value={summary_name} onChange={(e) => setSummaryName(e.target.value)} />
        </label>
        <label>
          Summary:
          <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    )
}

export default App;
