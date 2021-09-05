import {CIRCLE,RECTANGLE,LINE,FREE_DRAW, SELECT, FILL_COLOR, STROKE_COLOR,DRAW} from '../utility/Constants'
import paperCore, { Path,Point,view,Tool} from 'paper/dist/paper-core'

import {useContext, useEffect } from 'react'
import { DrawTypeContext } from '../store/DrawTypeStore'
import { IndexContext } from '../store/IndexStore'
import { PathsContext } from '../store/PathsStore'
import ColorPicker from './ColorPicker'
import { ColorTypeContext } from '../store/ColorTypeStore'
import { StrokePropertyContext } from '../store/StrokePropertyStore'
import { HistoryContext } from '../store/HistoryStore'
import { ToolTypeContext } from '../store/ToolTypeStore'
const ToolBar = () => {
    const {drawType, setDrawType} = useContext(DrawTypeContext)
const {index, setIndex} = useContext(IndexContext)
const {paths, setPaths} = useContext(PathsContext)
const {colorType,setColorType} = useContext(ColorTypeContext)
const {strokeProperty,setStrokeProperty} = useContext(StrokePropertyContext)
const {history, setHistory} = useContext(HistoryContext)
const {toolType, setToolType} = useContext(ToolTypeContext)

    useEffect(() => {
        // console.log("drawType",drawType)

    }, [drawType]);
    const handleUndo = () => {
        console.log("Undo")
        console.log("Length",index)
        if(paths[index]!==undefined)
        {
        //   console.log(paths.length)
        //   console.log(paths)
        //   console.log(paths.length)
          paths[index].remove()
          setHistory((_idx)=>[..._idx,index])
          setIndex((_idx)=>--_idx)
          
          // console.log("Paths",paths)
          
          // const _paths = paths.pop()
          // setPaths(_paths)
        }
        
        
        }
         const handleSave = () => {
          console.log("Save")
        
        }
         const handleRedo = () => {
          console.log("Redo")
          if(history.length)
          {
                   console.log(history[0])
                   history.shift()
          }
          
        }
         const handleClear = () => {
          console.log("Clear")
          paths.forEach((_path)=>{
            if(_path!==undefined)
            _path.remove()})
          
        
        }
    return (
        <div className="toolBar">
            <button onClick={handleUndo}>Undo</button>
<button onClick={handleRedo}>Redo</button>
<button onClick={handleClear}>Clear All</button>
<button onClick={()=>{setToolType(SELECT)}}>SELECT TOOL</button>
<button onClick={()=>{setDrawType(FREE_DRAW); setToolType(DRAW)}}>FREE DRAW</button>
<button onClick={()=>{setDrawType(RECTANGLE); setToolType(DRAW)}}>Rectangle</button>
<button onClick={()=>{setDrawType(CIRCLE); setToolType(DRAW)} }>Circle</button>
<button onClick={()=>{setDrawType(LINE); setToolType(DRAW)}}>LINE</button>
<ColorPicker/>
<button onClick={()=>{setColorType(FILL_COLOR)}}>FILL</button>
<button onClick={()=>{setColorType(STROKE_COLOR)}}>STROKE</button>
<input type="number" onChange={(e)=>setStrokeProperty({strokeWidth:e.target.value})} placeholder="Stroke Size"/>
        </div>
    );
}

export default ToolBar;