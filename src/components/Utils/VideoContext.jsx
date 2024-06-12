import React,{createContext,useReducer,useContext} from "react";

const VideoContext = createContext();
const videoReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_SEARCHED_VIDEOS':
            return {
                ...state,
                searchedVideos: action.payload,
            };
        default:
            return state;
    }
};

export const VideoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(videoReducer, { searchedVideos: [] });

    return (
        <VideoContext.Provider value={{ state, dispatch }}>
            {children}
        </VideoContext.Provider>
    );
};

export const useVideoContext = () => {
    return useContext(VideoContext);
};