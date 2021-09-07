import { project } from "paper/dist/paper-core"
import { useCallback, useContext } from "react"
import { HistoryContext } from "../store/HistoryStore"
import { IndexContext } from "../store/IndexStore"
import { ShapeTypeContext } from "../store/ShapeTypeStore"
import { ToolTypeContext } from "../store/ToolTypeStore"
import { CIRCLE, DRAW, LINE, PEN_TOOL, RECTANGLE, SELECT } from "../utility/Constants"
// import { useProject } from "./useProject"
export const useHandleKeyDown = (downloadRef) =>
{
  const {index, setIndex} = useContext(IndexContext)
const {setHistory} = useContext(HistoryContext)
const {setToolType} = useContext(ToolTypeContext)
const {setShapeType} = useContext(ShapeTypeContext)
let paths = []
let activeLayer = {}
if(project)
{
paths = project?.activeLayer.children
activeLayer = project?.activeLayer.children
}
const handleUndo = () => {
   
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
      
      project.activeLayer.remove()
    }
     const handleDelete = () => {
      paths.forEach((_path)=>{
        if(_path.selected)
        _path.remove()
      })
      
    
    }

 const keyDown = useCallback((e)=>{
   e = e.event
    if (e.ctrlKey &&  (e.key === "z" || e.key === "Z")) {
      e.preventDefault()
  
       handleUndo()
    } else if (e.ctrlKey & (e.key === "s" || e.key === "S")) {
      e.preventDefault()
      handleSave()
    } else if (e.ctrlKey && (e.key === "y" || e.key === "Y")) {
      e.preventDefault()
  
      handleRedo()
    }
    else if (e.ctrlKey && e.shiftKey && (e.key === "z" || e.key === "Z")) {
      e.preventDefault()
  
      handleRedo()
    }
    else if (e.ctrlKey && (e.key === "x" || e.key === "X")) {
      e.preventDefault()
  
      handleClearAll()
    }
    // else if (e.which===46 || e.which===8 ) {
    //   e.preventDefault()
  
    //   handleDelete()
    // }
    // else if (e.which===46 || e.which===8 ) {
    //   e.preventDefault()
  
    //   handleDelete()
    // }
    else if (e.ctrlKey && (e.key==="a" ||e.key==="A" )) {
      e.preventDefault()
  
      project.selectAll()
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