import { useState,createContext } from "react";
export const ItemPropertyContext = createContext()



export const ItemPropertyProvider = ({children})=>{
    const [itemProperty, setItemProperty] = useState({
        fillStyle:{
        color:"white"
    },
        strokeStyle:{
        color:"gray",
        width:"1"
    }
});
    const value = {itemProperty,setItemProperty}
return(<ItemPropertyContext.Provider value={value}>
    {children}
    </ItemPropertyContext.Provider>
    )
}