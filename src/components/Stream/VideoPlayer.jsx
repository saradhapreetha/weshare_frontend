import React,{useState} from 'react';
import ReactPlayer from 'react-player/lazy'

const VideoPlayer = () => {

  const [userStream,setUserStream] = useState("");

  const userVideo= async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio:true,
    video:true
  });
  setUserStream(stream);
}


  return (
    <div>
    <div className='m-10'>
        <ReactPlayer
        width="1280px"
        height="720px"
        url="https://www.youtube.com/watch?v=HS_aCR_0nOA"
        controls={true}></ReactPlayer>
    </div>
    <div className='m-10'>
        <ReactPlayer
        width="1280px"
        height="720px"
        url={userStream}
        controls={true}></ReactPlayer>
    </div>
    <button className='bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-600 hover:to-orange-600 text-white text-center' onClick={userVideo}>
        Go Live
    </button>
    </div>
  );
};

export default VideoPlayer;