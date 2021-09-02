import paperCore, { Path,Point,view,Tool} from 'paper/dist/paper-core'
import { useEffect, useRef,useState } from 'react'
import Canvas from '../components/Canvas'
export default function Home() {
const [path, setPath] = useState()
const [key, setKey] = useState(false)
const [paths, setPaths] = useState([])
const canvasRef = useRef()
const initPaper = () =>{
  paperCore.install(canvasRef.current)
  paperCore.setup(canvasRef.current);
  
}
const handleUndo = () => {
console.log("Undo")

if(paths.length)
{
  console.log("Paths",paths)
  console.log("Length",paths.length)
  paths[paths.length-1].remove()
  setPaths(()=>paths.pop())
}

}
const handleSave = () => {
  console.log("Save")

}
const handleRedo = () => {
  console.log("Redo")

}
const handleClear = () => {
  console.log("Clear")

}
const handleKeyDown = (e)=>{
  setKey(true)
  if (e.ctrlKey &&  (e.which === 122 || e.which === 90)) {
     handleUndo()
  } else if (e.ctrlKey & (e.which === 115 || e.which === 83)) {
    e.preventDefault()
    handleSave()
  } else if (e.ctrlKey && (e.which === 121 || e.which === 89)) {
    handleRedo()
  }
  else if (e.ctrlKey && (e.which === 120 || e.which === 88)) {
    handleClear()
  }
 }
var myPath;
function onMouseDown(event) {
  myPath  = new Path()
	myPath.strokeColor = 'black';
  setPath(myPath)
}

function onMouseDrag(event) {

	path.add(event.point)
}

function onMouseUp(event) {
  // path.selected = true
  // path.closed = true;
  // Select the path, so we can see its handles:
  // path.fullySelected = true;
  // path.selected = true
  path.smooth()
  setPaths((_path)=>[..._path,path])
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
// console.log(path)
// if(path)
// path.onDoubleClick = ()=>{
//   console.log("clicked")
// }
  },[path])
useEffect(() => {
  document.addEventListener('keydown',(e)=>{ handleKeyDown(e);})

    },[key])
  
  return (
   <>
<h1>XDraw</h1>
<Canvas ref = {canvasRef}/>
   </>
  )
}
