const { useReducer,createContext } = require("react");
import {CIRCLE,RECTANGLE,LINE,FREE_DRAW,SELECT} from '../utility/Constants'
export const DrawTypeContext = createContext()

const initialDrawTypeState = FREE_DRAW

const reducer = (state,action)=>{
    switch(action)
    {
        case FREE_DRAW:
            {
                return FREE_DRAW
            }
        case RECTANGLE:
            {
                return RECTANGLE
            }
        case CIRCLE:
            {
                return CIRCLE
            }
        case LINE:
            {
                return LINE
            }
     
        default: return state
    }
}


export const DrawTypeProvider = ({children})=>{
    const [drawType,setDrawType] = useReducer(reducer,initialDrawTypeState)
    const value = {drawType,setDrawType}
return(<DrawTypeContext.Provider value={value}>
    {children}
    </DrawTypeContext.Provider>
    )
}