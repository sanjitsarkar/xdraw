import paperCore, { Path,Point,view,Tool} from 'paper/dist/paper-core'
import { useEffect, useRef,useState } from 'react'
import Canvas from '../components/Canvas'
export default function Home() {
const [path, setPath] = useState({})
const [key, setKey] = useState(false)
const [index, setIndex] = useState(0)
const [paths, setPaths] = useState([])
const canvasRef = useRef()
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
  if(paths[index]!==undefined)
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

}
const handleKeyDown = (e)=>{
  setKey(true)
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
var myPath;
function onMouseDown(event) {
  myPath  = new Path()
	myPath.strokeColor = 'black';
  setPath(myPath)
  setIndex(paths.length+=1)

}

function onMouseDrag(event) {

	path.add(event.point)

}

function onMouseUp(event) {
console.log("idx",index)
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

  },[path,index])
useEffect(() => {
  document.addEventListener('keydown',(e)=>{ handleKeyDown(e);})

    },[key])
  
  return (
   <>
<h1>XDraw</h1>
<button onClick={handleUndo}>Undo</button>
<button onClick={handleRedo}>Redo</button>
<Canvas ref = {canvasRef}/>
   </>
  )
}
