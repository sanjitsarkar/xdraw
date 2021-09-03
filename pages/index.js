import { useRef,useState } from 'react'
import Canvas from '../components/Canvas'
import ToolBar from '../components/ToolBar'
export default function Home() {
  const [strokeSize, setStrokeSize] = useState(1)



const canvasRef = useRef()
  return (
   <>
<h1>XDraw</h1>
<ToolBar setStrokeSize = {setStrokeSize}/>
<Canvas ref={canvasRef} strokeSize = {strokeSize}/>
{/* <Canvas ref = {canvasRef}/> */}
   </>
  )
}
