import { useState,createContext } from "react";
export const StrokePropertyContext = createContext()



export const StrokePropertyProvider = ({children})=>{
    const [strokeProperty, setStrokeProperty] = useState({strokeWidth:1});
    const value = {strokeProperty,setStrokeProperty}
return(<StrokePropertyContext.Provider value={value}>
    {children}
    </StrokePropertyContext.Provider>
    )
}