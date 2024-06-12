import { BrowserRouter,Routes,Route } from "react-router-dom";
import './App.css'
//import VideoUpload from "./components/UploadVideo/VideoUpload";
import VideoUpload from "./components/UploadVideo/VideoUpload";
import VideoPlayer from "./components/Stream/VideoPlayer";
import Layout from "./components/Layout/Layout";
import Watch from "./components/Home/Watch";

function App() {


  return (
    <>
       <div>
       <BrowserRouter>
       <Layout>
          <Routes>
            <Route path="/upload" element={<VideoUpload />}/> 
          </Routes>
        </Layout>
        <Routes>
        <Route path="/watch" element={<Watch />}/>
        </Routes>
        </BrowserRouter>
       </div>
    </>
  )
}

export default App
