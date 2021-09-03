import { useState,createContext } from "react";
import { FILL_COLOR } from "../utility/Constants";
export const ColorTypeContext = createContext()



export const ColorTypeProvider = ({children})=>{
    const [colorType, setColorType] = useState(FILL_COLOR);
    const value = {colorType, setColorType}
return(<ColorTypeContext.Provider value={value}>
    {children}
    </ColorTypeContext.Provider>
    )
}