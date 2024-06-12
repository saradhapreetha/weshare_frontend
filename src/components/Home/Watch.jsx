import React, { useState, useEffect } from 'react';
import { useVideoContext } from '../Utils/VideoContext';
import SearchBar from '../Search/SearchBar';
import axios from 'axios';
import ReactPlayer from 'react-player';

const Watch = () => {
    const {state} = useVideoContext();
    const {searchedVideos} = state;
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [length, setLength] = useState(0);

    useEffect(() => {
        const getVideos = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_WATCH_SERVICE_URL}/home/watch`);
                setVideos(res.data);
                setLength(res.data.length);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching videos ', error);
                setLoading(false);
            }
        };
        getVideos();
    }, []);

    return (
        <div>
            <SearchBar />
            {loading ? (
                <div className='container mx-auto flex justify-center min-h-screen'>
                    Loading...
                </div>
            ) : (searchedVideos.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10'>
                    {searchedVideos.map((video) => (
                        <div key={video._id} className='border rounded-md overflow-hidden'>
                            <div>
                                <ReactPlayer url={video.videoUrl} width='360px' height='180px' controls={true} />
                            </div>
                            <div className='p-4'>
                                <h2 className='text-lg font-semibold mb-2'>{video.title}</h2>
                                <p className='text-gray-700'>Author - {video.author}</p>
                                <p className='text-gray-700'>{video.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : length === 0 ? (
                <div>No videos to show.</div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10'>
                    {videos.map((video) => (
                        <div key={video.title} className='border rounded-md overflow-hidden'>
                            <div>
                                <ReactPlayer url={video.presignedURL} width='360px' height='180px' controls={true} />
                            </div>
                            <div className='p-4'>
                                <h2 className='text-lg font-semibold mb-2'>{video.title}</h2>
                                <p className='text-gray-700'>Author - {video.author}</p>
                                <p className='text-gray-700'>{video.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Watch;
