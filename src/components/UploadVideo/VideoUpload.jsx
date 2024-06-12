import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [author,setAuthor] = useState("");
    const [selectedFile,setSelectedFile]  = useState("");

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    }
    
    const handleUpload = async () => {
      try{

        const formData = new FormData();
        formData.append('filename',selectedFile.name);
        const initializeRes= await axios.post(`${process.env.REACT_APP_UPLOAD_SERVICE_URL}/api/v1/initialize`, formData, {
          headers:{
            'Content-Type':'multipart/form-data'
          },
          withCredentials: true
      });


        const {uploadId} = initializeRes.data;

        const chunkSize = 5 * 1024 * 1024;
        const totalChunks = Math.ceil(selectedFile.size/chunkSize)
        
        let start=0;
        let chunkPromises = [];
        for(let chunkIndex = 1; chunkIndex<=totalChunks;chunkIndex++)
        {
            const chunk = selectedFile.slice(start,start+chunkSize);
            start+=chunkSize;

            const chunkFormData = new FormData();
            chunkFormData.append('filename',selectedFile.name);
            chunkFormData.append('chunk',chunk);
            chunkFormData.append('totalChunks',totalChunks);
            chunkFormData.append('chunkIndex',chunkIndex);
            chunkFormData.append('uploadId',uploadId);

           const chunkPromise =  await axios.post(`${process.env.REACT_APP_UPLOAD_SERVICE_URL}/api/v1/upload`,chunkFormData,{
              headers:{
                'Content-Type':'multipart/form-data'
              },
              withCredentials: true
            });

            chunkPromises.push(chunkPromise);
        }

        await Promise.all(chunkPromises);

        //complete upload

        const completeRes = await axios.post(`${process.env.REACT_APP_UPLOAD_SERVICE_URL}/api/v1/upload/complete`,{
          filename: selectedFile.name,
          totalChunks:totalChunks,
          uploadId:uploadId
        },{ withCredentials:true});
      
        const saveToDB = await axios.post(`${process.env.REACT_APP_UPLOAD_SERVICE_URL}/api/v1/addVideos`,{
          title:title,
          description:description,
          author:author,
          objectkey:completeRes.data.key,
          url:completeRes.data.location,
        },{withCredentials:true});
   
        
        const saveToSearchDB = await axios.post(`${process.env.REACT_APP_UPLOAD_SERVICE_URL}/api/v1/search/add`,{
          title:title,
          description:description,
          author:author,
          objectkey:completeRes.data.key,
          url:completeRes.data.location,
        },{withCredentials:true});
    
      }
      catch(error){
          console.error('Error uploading file:',error);
      }
    }



  return (

    <div className='container mx-auto flex justify-center items-center max-w-lg p-10'>
                <form encType="multipart/htmlForm-data">
                <div className='mb-5'>
                    <label htmlFor="video-title">Title</label> <br />
                    <input type="text" id="video-title" name="Title" placeholder='Enter a title' value = {title} onChange={(e)=>{
                      setTitle(e.target.value)
                    }} required className="px-2 py-2 rounded-md border focus:outline-none focus:border-blue-500"/><br/>
                </div>
                <div className='mb-5 w-full'>
                <label htmlFor="description">Description</label> <br />
                  <input type="text" id="description" name="description" placeholder='Provide a description.'  value = {description} onChange = {(e) => {
                      setDescription(e.target.value)
                  }}className="px-2 py-2 rounded-md border focus:outline-none focus:border-blue-500"/><br/>
                </div>
                <div className='mb-5'>
                <label htmlFor="description">Author</label> <br />
                <input type="text" id="author" name="author" placeholder="Enter Author's name"  value = {author} onChange = {(e) => {
                    setAuthor(e.target.value)
                }}className="px-2 py-2 rounded-md border focus:outline-none focus:border-blue-500"/><br/>
                </div>

                <div className='mb-5'>
                  <label htmlFor="video">Video File</label> <br />
                  <input type="file" id="video" onChange = {handleFileChange} name="file" className='px-2 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500'/>
                </div>
                
                <button type="button" onClick= {handleUpload} class='bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-600 hover:to-orange-600 text-white text-center'>Upload</button>
            </form>
    </div>
  );
};

export default VideoUpload;