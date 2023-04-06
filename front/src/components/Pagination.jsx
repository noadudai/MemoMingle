import React from 'react'

const Pagination = ({ itemsPerPage, totalitems, currentPage, onPageChange }) => {
    
    const pageNumbers = [];
    const numberOfPages = Math.ceil(totalitems / itemsPerPage);

    for (let i = 1; i <= numberOfPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <nav className='block'>
                <ul className='flex flex-wrap justify-center'>
                    <li>
                        {pageNumbers.map((number) => (
                            <a 
                                onClick={ () => {onPageChange(number)}}
                                href="#"
                                className={currentPage === number ?
                                "text-teal-200 bg-gray-600 hover:bg-gray-500  p-2" :
                                "text-white bg-gray-700 hover:bg-gray-500 p-2"}
                            >
                                {number}
                            </a>
                        ))}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination
