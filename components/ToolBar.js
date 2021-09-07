import {CIRCLE,RECTANGLE,LINE,FREE_DRAW, SELECT, FILL_COLOR, STROKE_COLOR,DRAW,PEN_TOOL, POLYGON, TEXT_TOOL, HAND_TOOL} from '../utility/Constants'
import Rectangle from "./icons/rectangle.svg"
import Circle from "./icons/circle.svg"
import PenTool from "./icons/pen_tool.svg"
import SelectTool from "./icons/select_tool.svg"
import ScaleTool from "./icons/scale_tool.svg"
import TextTool from "./icons/text_tool.svg"
import Star from "./icons/star.svg"
import Arrow from "./icons/arrow.svg"
import Line from "./icons/line.svg"
import Polygon from "./icons/polygon.svg"
import Angle from "./icons/angle.svg"
import ColorPickerTool from "./icons/color_picker.svg"
import PaintBucket from "./icons/paint_bucket.svg"
import Image from "./icons/image.svg"
import HandTool from "./icons/hand_tool.svg"
import DrawTool from "./icons/draw_tool.svg"
import PencilTool from "./icons/pencil_tool.svg"

import {useContext, useState,useEffect } from 'react'
import { ShapeTypeContext } from '../store/ShapeTypeStore'
import ColorPicker from './ColorPicker'
import { ColorTypeContext } from '../store/ColorTypeStore'
import { ToolTypeContext } from '../store/ToolTypeStore'
import { ColorContext } from '../store/ColorStore'
import { ShowColorPickerContext } from '../store/ShowColorPickerStore'
import { ItemPropertyContext } from '../store/ItemPropertyStore'
const ToolBar = () => {
const {setShapeType} = useContext(ShapeTypeContext)
const {setColorType} = useContext(ColorTypeContext)
const {setToolType} = useContext(ToolTypeContext)
const {showColorPicker, setShowColorPicker} = useContext(ShowColorPickerContext)
const [isActive, setIsActive] = useState(false);
const [activeShape, setActiveShape] = useState(<Rectangle/>);
const [activeTransformTool, setActiveTransformTool] = useState(<SelectTool/>);
const [activePenTool, setActivePenTool] = useState(<PenTool/>);
const {itemProperty,setItemProperty} = useContext(ItemPropertyContext)
const {fillStyle,strokeStyle} = itemProperty
useEffect(() => {
  setToolType(DRAW)

}, [activeShape]);
    return (
        <div className="toolBar">

<div className="dropdown">
  <div className="dropbtn">
      <div className="toolBarIcon active">
   

{activeTransformTool}

        </div> 
  </div>
  <div className="dropdownContent">
  <div className="toolBarIcon" onClick={()=>{setActiveTransformTool(<SelectTool/>),setToolType(SELECT)}}>
 <SelectTool/>
 <span>V</span>

    </div> 
  <div className="toolBarIcon" onClick={()=>{setActiveTransformTool(<ScaleTool/>),setToolType(SELECT)}}>  
  <ScaleTool/>
  <span>K</span>

  </div>

  </div>
</div>
<div className="dropdown">
  <div className="dropbtn">
      <div className="toolBarIcon active" src="./icons/pen_tool.svg">
{activePenTool}
    

        </div> 
  </div>
  <div className="dropdownContent">
  <div className="toolBarIcon" src="./icons/pen_tool.svg" onClick={()=>{setActivePenTool(<PenTool/>),setToolType(PEN_TOOL)}}>

<PenTool/>
<span>P</span>

  </div>
  <div className="toolBarIcon " src="./icons/pencil_tool.svg" onClick={()=>{setActivePenTool(<PencilTool/>),setToolType(PEN_TOOL)}}>
 <PencilTool/>

  </div>

  </div>
</div>
<div className="dropdown">
  <div className="dropbtn">
      <div className="toolBarIcon active" src="./icons/rectangle.svg">
{activeShape}
   
      </div>
  </div>
  <div className="dropdownContent">
  <div className="toolBarIcon" src="./icons/rectangle.svg" onClick={()=>{setActiveShape(<Rectangle/>),setShapeType(RECTANGLE)}}>
<Rectangle/>
<span>R</span>
</div> 
  <div className="toolBarIcon line" src="./icons/line.svg" onClick={()=>{setActiveShape(<Line/>),setShapeType(LINE)}}>
    <Line/>
    <span>L</span>

</div> 
  <div className="toolBarIcon" src="./icons/arrow.svg"onClick={()=>{setActiveShape(<Arrow/>),setShapeType(LINE)}}>
    <Arrow/>
</div> 
  <div className="toolBarIcon" src="./icons/circle.svg"onClick={()=>{setActiveShape(<Circle/>),setShapeType(CIRCLE)}}>
    <Circle/>
    <span>O</span>

</div> 
  <div className="toolBarIcon" src="./icons/polygon.svg"onClick={()=>{setActiveShape(<Polygon/>),setShapeType(POLYGON)}}>
    <Polygon/>
</div> 
  <div className="toolBarIcon" src="./icons/star.svg"onClick={()=>{setActiveShape(<Star/>),setShapeType(POLYGON)}}>
    <Star/>
</div> 
  <div className="toolBarIcon" src="./icons/image.svg"onClick={()=>{setActiveShape(<Image/>),setShapeType(POLYGON)}}>
    <Image/>
</div> 

  </div>
</div>
<div className="dropbtn">
      <div className="toolBarIcon active" src="./icons/draw_tool.svg" onClick={()=>{setShapeType(FREE_DRAW),setToolType(DRAW)}}>
        <DrawTool/>
        {/* D */}
</div> 
  </div>
<div className="dropbtn">
      <div className="toolBarIcon active" src="./icons/text_tool.svg" onClick={()=>{setToolType(TEXT_TOOL)}}>
        <TextTool/>
        {/* T */}
</div> 
  </div>
<div className="dropbtn">
      <div className="toolBarIcon active" src="./icons/hand_tool.svg" onClick={()=>{setToolType(HAND_TOOL)}}>
        <HandTool/>
        {/* H */}
</div> 
  </div>


<button className="color_box fill_color" style={{backgroundColor:fillStyle.color}} onClick={()=>{setColorType(FILL_COLOR); setShowColorPicker(true)}}></button>
<button className="color_box stroke_color" style={{borderColor:strokeStyle.color}} onClick={()=>{setColorType(STROKE_COLOR); setShowColorPicker(true)}}></button>
{showColorPicker &&
<ColorPicker/>}
{/* <input type="number" onChange={(e)=>setItemProperty({strokeWidth:e.target.value})} placeholder="Stroke Size"/> */}
        </div>
    );
}

export default ToolBar;