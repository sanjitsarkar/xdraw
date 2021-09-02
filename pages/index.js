import paperCore, { Path,Point,view,Tool} from 'paper/dist/paper-core'
import { useEffect, useRef,useState } from 'react'
import Canvas from '../components/Canvas'
export default function Home() {
  const SHAPE = "SHAPE"
  const RECTANGLE = "RECTANGLE"
  const CIRCLE = "CIRCLE"
  const LINE = "LINE"
const [path, setPath] = useState({})
const [drawType, setDrawType] = useState(SHAPE)
// const [key, setKey] = useState(false)
const [index, setIndex] = useState(0)
const [paths, setPaths] = useState([])
const canvasRef = useRef()
var myPath;
const initPaper = () =>{
  paperCore.install(canvasRef.current)
  paperCore.setup(canvasRef.current);
  
}
const handleUndo = () => {
console.log("Undo")
console.log("Length",index)
if(paths[index]!==undefined)
{
  console.log(paths.length)
  console.log(paths)
  console.log(paths.length)
  paths[index].remove()
  setIndex((idx)=>--idx)
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
  if(index)
  {
    // console.log(paths.length)
    // console.log(paths)
    // console.log(paths.length)
    // paths[index].add(paths[index-1])
    // setIndex((idx)=>++idx)
    // console.log("Paths",paths)
    
    // const _paths = paths.pop()
    // setPaths(_paths)
  }
  
}
const handleClear = () => {
  console.log("Clear")
  paths.forEach((_path)=>{
    if(_path!==undefined)
    _path.remove()})
  

}
const initShape = () => {
  myPath  = new Path()
	myPath.strokeColor = 'black';
}
const drawShape = (event) => {
	path.add(event.point)

}
const initCircle = (event) =>{
  myPath  = new Path.Circle(event.point,100)
	myPath.strokeColor = 'black';
  myPath.fillColor = 'red'
}
const drawCircle = (event) => {
  console.log("drawCircle")

}
const initRectangle = (event) =>{
  myPath  = new Path.Rectangle(event.point,40,30)
	myPath.strokeColor = 'black';
  myPath.fillColor = 'red'
}
const drawRectangle = () => {
  console.log("drawRectangle")

  

}

const handleKeyDown = (e)=>{
  // setKey(true)
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

    handleClear()
  }
 }
function onMouseDown(event) {
  console.log("drawType",drawType)
  switch(drawType)
  {
    case SHAPE:{
  initShape(event)
  break;
    }
    case RECTANGLE:{
  initRectangle(event)
  break;

    }
    case CIRCLE:{
  initCircle(event)
  break;

    }
  }
  
  setPath(myPath)
  setIndex(paths.length+=1)

}

function onMouseDrag(event) {
switch(drawType)
{
  case SHAPE:{
drawShape(event)
break;

  }
  case RECTANGLE:{
drawRectangle(event)
break;

  }
  case CIRCLE:{
    drawCircle(event)
  break;

      }
}

}

function onMouseUp(event) {
  switch(drawType)
{

  case RECTANGLE:{
drawRectangle(event)
break;

  }
  case CIRCLE:{
    drawCircle(event)
  break;

      }
}


// console.log("idx",index)
  // path.selected = true
  // path.closed = true;
  // Select the path, so we can see its handles:
  // path.fullySelected = true;
  // path.selected = true
  // path.smooth()
  if(paths.length){
    // console.log(paths.length)
    // console.log("_Paths",paths)
  setPaths((_path)=>[..._path,path])
  }
  // else{
  //   // console.log(paths.length)

  // setPaths((_path)=>[path])
  
  // }

  // paths.map((_path)=>_path.selected=true)
	// var myCircle = new Path.Circle({
	// 	center: event.point,
	// 	radius: 10
	// });
	// myCircle.strokeColor = 'black';
	// myCircle.fillColor = 'white';
}

  useEffect(() => {
    initPaper()
    
   
  }, [])
  
  useEffect(() => {
    view.onMouseDown = onMouseDown
    view.onMouseUp = onMouseUp
    view.onMouseDrag = onMouseDrag

  },[path])
useEffect(() => {
  document.addEventListener('keydown',(e)=>{ handleKeyDown(e);})

    },[])
  
  return (
   <>
<h1>XDraw</h1>
<button onClick={handleUndo}>Undo</button>
<button onClick={handleRedo}>Redo</button>
<button onClick={handleClear}>Clear All</button>
<button onClick={()=>{setDrawType(RECTANGLE)}}>Rectangle</button>
<button onClick={()=>{setDrawType(CIRCLE)}}>Circle</button>
<Canvas ref = {canvasRef}/>
   </>
  )
}
