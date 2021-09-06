import { useState,createContext } from "react";
export const ColorContext = createContext()



export const ColorProvider = ({children})=>{
    const [fillColor, setFillColor] = useState('white');
    const [strokeColor, setStrokeColor] = useState('gray');
    const value = {fillColor,setFillColor,strokeColor,setStrokeColor}
return(<ColorContext.Provider value={value}>
    {children}
    </ColorContext.Provider>
    )
}