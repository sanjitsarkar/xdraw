import { useState,createContext } from "react";
export const IndexContext = createContext()



export const IndexProvider = ({children})=>{
    const [index, setIndex] = useState(0);
    const value = {index,setIndex}
return(<IndexContext.Provider value={value}>
    {children}
    </IndexContext.Provider>
    )
}