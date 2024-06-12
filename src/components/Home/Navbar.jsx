import React, { useEffect ,useContext} from 'react';
import { useAsyncValue, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Utils/AuthContext';

const Navbar = () => {


 const {data , signIn, signOut} = useContext(AuthContext);
 const navigate = useNavigate();

 const goToUpload = () => {
    navigate("/upload");
 }
  return (
    <div>
      <nav class="bg-white border-gray-200 dark:bg-gray-900 mb-10">
               <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                   <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Weshare</span>
                   <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                       {
                           data ? (
                               <div className='flex'>
                                   <button
                                       type="button"
                                       onClick={goToUpload}
                                       className="text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-600 hover:to-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
                                   >
                                       Upload
                                   </button>
                                   <button
                                       type="button"
                                       onClick={signOut}
                                       className="text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-600 hover:to-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
                                   >
                                       Sign Out
                                   </button>
                                   <span className='my-5'>
                                       Hello {data.name}
                                   </span>
                                   {/* <div className='m-3'>
                                       <img class="w-10 h-10 rounded-full" src={data.image} alt="" />
                                   </div> */}
                               </div>

                           ) : (
                               <button
                                   type="button"
                                   onClick={signIn}
                                   className="text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-600 hover:to-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                               >
                                   Sign In
                               </button>
                           )
                       }
                   </div>
               </div>
           </nav>

    </div>
  );
};

export default Navbar;