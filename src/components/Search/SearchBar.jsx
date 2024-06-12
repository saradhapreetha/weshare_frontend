import React,{useContext,useState} from 'react';
import {useVideoContext} from '../Utils/VideoContext';
import axios from 'axios';

const SearchBar = () => {
    
    const [searchText , setSearchText]  = useState('');
    const {dispatch} = useVideoContext();


    const searchVideos = async() => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_UPLOAD_SERVICE_URL}/api/v1/search`,{params : {query:searchText}, withCredentials:true});
            dispatch({type: 'UPDATE_SEARCHED_VIDEOS',payload:res.data});
        }
        catch(error)
        {
            console.log("Error in search ",error.message);
        }
    }


  return (
    <div>
       <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
       <div className="flex justify-center items-center">
            <div className="inset-y-0 ps-3 pointer-events-none">
            <svg className="ml-4 w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
            </div>
            <input type="text" 
                id="default-search"
                className='w-[75%] ml-4 p-4 ps-10 text-sw text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                required
           />
           <button type="submit" onClick={searchVideos} className="ml-4 mr-4 text-white end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search
           </button>
       </div>
    </div>
  );
};

export default SearchBar;