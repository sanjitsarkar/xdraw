const { useReducer,createContext } = require("react");
import {CIRCLE,RECTANGLE,LINE,FREE_DRAW, POLYGON, PEN_TOOL} from '../utility/Constants'
export const ShapeTypeContext = createContext()

const initialShapeTypeState = FREE_DRAW

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
        case POLYGON:
            {
                return POLYGON
            }
        case PEN_TOOL:
            {
                return PEN_TOOL
            }
     
        default: return state
    }
}


export const ShapeTypeProvider = ({children})=>{
    const [shapeType,setShapeType] = useReducer(reducer,initialShapeTypeState)
    const value = {shapeType,setShapeType}
return(<ShapeTypeContext.Provider value={value}>
    {children}
    </ShapeTypeContext.Provider>
    )
}