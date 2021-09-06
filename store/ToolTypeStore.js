const { useReducer,createContext } = require("react");
import {CIRCLE,RECTANGLE,LINE,FREE_DRAW,SELECT, DRAW, TEXT_TOOL, HAND_TOOL, MOVE} from '../utility/Constants'
export const ToolTypeContext = createContext()

const initialToolTypeState = DRAW

const reducer = (state,action)=>{
    switch(action)
    {
        case DRAW:
            {
                return DRAW
            }
        case SELECT:
            {
                return SELECT
            }
        case TEXT_TOOL:
            {
                return TEXT_TOOL
            }
       
        case HAND_TOOL:
            {
                return HAND_TOOL
            }
        case MOVE:
            {
                console.log("MOVE")
                return MOVE
            }
       
        default: return state
    }
}


export const ToolTypeProvider = ({children})=>{
    const [toolType,setToolType] = useReducer(reducer,initialToolTypeState)
    const value = {toolType,setToolType}
return(<ToolTypeContext.Provider value={value}>
    {children}
    </ToolTypeContext.Provider>
    )
}