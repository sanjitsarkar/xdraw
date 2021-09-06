import { useState,createContext } from "react";
export const ShowColorPickerContext = createContext()



export const ShowColorPickerProvider = ({children})=>{
    const [showColorPicker, setShowColorPicker] = useState(false)
    const value = {showColorPicker, setShowColorPicker}
return(<ShowColorPickerContext.Provider value={value}>
    {children}
    </ShowColorPickerContext.Provider>
    )
}