import React from 'react';

const Pagination = ({ table, details, pageNo, handlePreviousPage, handleNextPage }) => {
    const startingPoint = (pageNo - 1) * 10 + 1;
    const endingPoint = Math.min(startingPoint + 10 - 1, details.count);

    return (
        <>
            {
                table ? <div>
                    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-3 select-none" aria-label="Table navigation">
                        <p className="text-sm md:text-base font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                            Showing <span className="font-semibold text-gray-900">{startingPoint}-{endingPoint}</span> of <span className="font-semibold text-gray-900">{details.count}</span>
                        </p>
                        <ul className="inline-flex -space-x-px">
                            <li>
                                <button type="button" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:hover:bg-white disabled:cursor-not-allowed" disabled={details.previous ? false : true} onClick={handlePreviousPage}>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <p className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300">{pageNo}</p>
                            </li>
                            <li>
                                <button type="button" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:hover:bg-white disabled:cursor-not-allowed" disabled={details.next ? false : true} onClick={handleNextPage}>
                                    <svg className="w-3 h-" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div> : <div className="h-32 flex justify-center items-center select-none">
                    <div className="flex">
                        <button type="button" className="md:w-40 flex items-center justify-center px-4 h-10 me-3 font-semibold text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer disabled:hover:bg-white disabled:hover:text-gray-500 disabled:cursor-not-allowed" disabled={details.previous ? false : true} onClick={handlePreviousPage}>
                            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                            </svg>
                            Previous
                        </button>
                        <div className="md:w-32 flex items-center justify-center px-4 h-10 me-3 font-semibold border border-gray-300 rounded-lg bg-gray-100text-gray-700">Page {pageNo}</div>
                        <button type="button" className="md:w-40 flex items-center justify-center px-4 h-10 me-3 font-semibold text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer disabled:hover:bg-white disabled:hover:text-gray-500 disabled:cursor-not-allowed" disabled={details.next ? false : true} onClick={handleNextPage}>
                            Next
                            <svg className="w-4 h-4 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </button>
                    </div>
                </div>
            }
        </>        
    );
};

export default Pagination;