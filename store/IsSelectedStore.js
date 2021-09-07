import { useState,createContext } from "react";
export const IsSelectedContext = createContext()



export const IsSelectedProvider = ({children})=>{
    const [isSelected, setIsSelected] = useState(false);
    const [isMultiSelected, setIsMultiSelected] = useState(false);
    const value = {isSelected, setIsSelected,isMultiSelected, setIsMultiSelected}
return(<IsSelectedContext.Provider value={value}>
    {children}
    </IsSelectedContext.Provider>
    )
}