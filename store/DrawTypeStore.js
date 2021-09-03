const { useReducer,createContext } = require("react");
import {CIRCLE,RECTANGLE,LINE,SHAPE,SELECT} from '../utility/Constants'
export const DrawTypeContext = createContext()

const initialDrawTypeState = SHAPE

const reducer = (state,action)=>{
    switch(action)
    {
        case SHAPE:
            {
                return SHAPE
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
        case SELECT:
            {
                return SELECT
            }
        // default: return state
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