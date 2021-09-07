import { project } from "paper/dist/paper-core";
import { useState,createContext } from "react";
export const PathsContext = createContext()



export const PathsProvider = ({children})=>{
    const [paths, setPaths] = useState(project?.activeLayer?.children);
    const value = {paths,setPaths}
return(<PathsContext.Provider value={value}>
    {children}
    </PathsContext.Provider>
    )
}