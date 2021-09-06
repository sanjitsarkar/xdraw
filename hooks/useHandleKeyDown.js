import { project } from "paper/dist/paper-core"
import { useCallback, useContext } from "react"
import { HistoryContext } from "../store/HistoryStore"
import { IndexContext } from "../store/IndexStore"
import { PathsContext } from "../store/PathsStore"
import { ShapeTypeContext } from "../store/ShapeTypeStore"
import { ToolTypeContext } from "../store/ToolTypeStore"
import { CIRCLE, DRAW, LINE, PEN_TOOL, RECTANGLE, SELECT } from "../utility/Constants"
export const useHandleKeyDown = (downloadRef) =>
{
  const {index, setIndex} = useContext(IndexContext)
const {paths} = useContext(PathsContext)
const {setHistory} = useContext(HistoryContext)
const {setToolType} = useContext(ToolTypeContext)
const {setShapeType} = useContext(ShapeTypeContext)
const handleUndo = () => {
    console.log("Undo")
    console.log("Length",index)
    if(index>=0)
    {
      paths[index].remove()
      setHistory((_idx)=>[..._idx,index])
      setIndex((_idx)=>--_idx)
    }
    
    
    }
     const handleSave = () => {
      console.log("Save")
      var fileName = "custom.svg"
     var url = "data:image/svg+xml;utf8," + encodeURIComponent(project.exportSVG({asString:true}));
     var link = downloadRef.current
     link.download = fileName;
     link.href = url;
     link.click();
      
    
    }
     const handleRedo = () => {
      console.log("Redo")
    }
     const handleClearAll = () => {
      console.log("Clear")
      paths.forEach((_path)=>{
        _path.remove()})
      
    
    }
     const handleDelete = () => {
      console.log("Delete")
      paths.forEach((_path)=>{
        if(_path.selected)
        _path.remove()
      })
      
    
    }

 const keyDown = useCallback((e)=>{
    if (e.ctrlKey &&  (e.which === 122 || e.which === 90)) {
      e.preventDefault()
  
       handleUndo()
    } else if (e.ctrlKey & (e.which === 115 || e.which === 83)) {
      e.preventDefault()
      handleSave()
    } else if (e.ctrlKey && (e.which === 121 || e.which === 89)) {
      e.preventDefault()
  
      handleRedo()
    }
    else if (e.ctrlKey && (e.which === 120 || e.which === 88)) {
      e.preventDefault()
  
      handleClearAll()
    }
    else if (e.which===46 || e.which===8 ) {
      e.preventDefault()
  
      handleDelete()
    }
    else if (e.which===46 || e.which===8 ) {
      e.preventDefault()
  
      handleDelete()
    }
    else if (e.key==="R" || e.key==="r" ) {
      e.preventDefault()
  setShapeType(RECTANGLE)
  setToolType(DRAW)
    }
    else if (e.key==="O" || e.key==="o" ) {
      e.preventDefault()
  
      setShapeType(CIRCLE)
      setToolType(DRAW)
    }
    else if (e.key==="l" || e.key==="L" ) {
      e.preventDefault()
  
      setShapeType(LINE)
      setToolType(DRAW)
    }
    else if (e.key==="V" || e.key==="v" ) {
      e.preventDefault()
  
      setToolType(SELECT)
    }
    else if (e.key==="K" || e.key==="k" ) {
      e.preventDefault()

      setToolType(SELECT)
    }
    else if (e.key==="K" || e.key==="k" ) {
      e.preventDefault()

      setToolType(SELECT)
    }
    else if (e.key==="p" || e.key==="P" ) {
      e.preventDefault()

      setToolType(PEN_TOOL)
    }
    
   })

   return [keyDown,handleRedo,handleUndo,handleSave,handleClearAll,handleDelete]
  }