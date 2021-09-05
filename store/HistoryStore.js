import { useState,createContext } from "react";
export const HistoryContext = createContext()



export const HistoryProvider = ({children})=>{
    const [history, setHistory] = useState([]);
    const value = {history, setHistory}
return(<HistoryContext.Provider value={value}>
    {children}
    </HistoryContext.Provider>
    )
}