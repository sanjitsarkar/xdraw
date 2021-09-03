import { useState,createContext } from "react";
export const PathsContext = createContext()



export const PathsProvider = ({children})=>{
    const [paths, setPaths] = useState([]);
    const value = {paths,setPaths}
return(<PathsContext.Provider value={value}>
    {children}
    </PathsContext.Provider>
    )
}