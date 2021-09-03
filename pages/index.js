import { useRef,useState } from 'react'
import Canvas from '../components/Canvas'
import ToolBar from '../components/ToolBar'
export default function Home() {
  const [strokeWidth, setstrokeWidth] = useState(1)



const canvasRef = useRef()
  return (
   <>
<ToolBar />
<h1>XDraw</h1>
<Canvas ref={canvasRef} />
   </>
  )
}
