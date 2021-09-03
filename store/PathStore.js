import { useState,createContext } from "react";
export const PathContext = createContext()



export const PathProvider = ({children})=>{
    const [path, setPath] = useState();
    const value = {path,setPath}
return(<PathContext.Provider value={value}>
    {children}
    </PathContext.Provider>
    )
}