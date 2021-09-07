// import Angle from "./icons/angle.svg"
// import ColorPickerTool from "./icons/color_picker.svg"
// import Constraints from "./icons/color_picker.svg"
// import BlendMode from "./icons/color_picker.svg"
// // import Constraints from "./icons/constraints.svg"
// // import Corners from "./icons/corners.svg"
// import Radius from "./icons/radius.svg"
// // import BlendMode from "./icons/blend_mode.svg"
// import EyeClosed from "./icons/eye_closed.svg"

import { project } from "paper/dist/paper-core";
import { useContext ,useEffect} from "react";
import { IsSelectedContext } from "../store/IsSelectedStore";
import { ItemPropertyContext } from "../store/ItemPropertyStore";
import { PathContext } from "../store/PathStore";

// import EyeOpen from "./icons/eye_open.svg"
const PropertyPanel = () => {
    const {itemProperty,setItemProperty} = useContext(ItemPropertyContext)
    const {position,size,strokeStyle,fillStyle,angle} = itemProperty
const {path,setPath} = useContext(PathContext)
const {isSelected, setIsSelected,isMultiSelected, setIsMultiSelected} = useContext(IsSelectedContext)

// console.log(path)
useEffect(() => {
if(path)
   setItemProperty({...itemProperty,position:path.position,size:path.bounds.size,strokeStyle:{color:path.strokeColor,width:path.strokeWidth},angle:path.rotation})
 
}, [path])
useEffect(() => {
    console.log("itemProperty",itemProperty)
}, [isSelected]);
     return (
         
         <div className="propertyPanel">
               {
            
            isSelected && path &&
            <>
            
            <h1>Design</h1>
            {/* <div className="item_align_sectiom">
            <h4>Item Align</h4>
            </div> */}
            <div className="item_transformation_section">
                <div className="row position">
             <div className="input_group">
                 <label>X</label>
                 <input type="number" name="" id="" value={position.x} />
             </div>
             <div className="input_group">
                 <label>Y</label>
                 <input type="number" name="" id="" value={position.y} />
             </div>
             </div>
                <div className="row size">
             <div className="input_group">
                 <label>W</label>
                 <input type="number" name="" id="" value={size.width} />
             </div>
             <div className="input_group">
                 <label>H</label>
                 <input type="number" name="" id="" value={size.height}/>
             </div>
             <div className="constraints">
                 {/* <Constraints/> */}
             </div>
             </div>
                <div className="row radius_angle">
             <div className="input_group">
                 {/* <Angle/> */}
                 <label>A</label>
                 <input type="number" name="" id="" />
             </div>
             <div className="input_group">
                 {/* <Radius/> */}
                 <label>R</label>
                 <input type="number" name="" id="" value={angle}/>
             </div>
             <div className="corners">
             <label>C</label>
             </div>
             </div>
            </div>
            <div className="item_blend_mode_section">
             <h4>Layer</h4>
             <div className="group">
             <div className="row">
             <label>Blend Mode</label>
              <select name="" id="">
                  <option value="normal">Normal</option>
                  <option value="darken">Darken</option>
                  <option value="lighten">Lighten</option>
                  <option value="multiply">Multiply</option>
                  <option value="screen">Screen</option>
                  <option value="overlay">Overlay</option>
              </select>
              </div>
              <div className="row">
              <span><input type="number" value="100"/>%</span>
              {/* <EyeOpen/> */}
              <button>Hide</button>
              </div>
              </div>
            </div>

            <div className="item_fill_section">
             <h4>Fill</h4>
             <div className="group">

            <div className="row">
                <button className="fill_color" style={{backgroundColor:fillStyle.color}}></button>
                <input type="text" value={fillStyle.color} 
                // onChange={(e)=>{setItemProperty({...itemProperty,fillStyle:{color:e.target.value}})}}
                />
              <span><input type="number" value="100"/>%</span>

            </div>
            <div className="row">
            <button>H</button>
                <button className="remove">-</button>
            </div>
            </div>
            </div>
            <div className="item_stroke_section">
            <h4>Stroke</h4>
            <div className="group">
            <div className="row">
                <button className="stroke_color" style={{borderColor:strokeStyle.color}} ></button>
                <input type="text" value={strokeStyle.color}
                
                // onChange={(e)=>{setItemProperty({...itemProperty,strokeStyle:{color:e.target.value}})}}
                />
              <span><input type="number" value="100" className="percent"/>%</span>

            </div>
            <div className="row">
            <button>Hide</button>
                <button className="remove">-</button>
            </div>
            </div>
            <div className="row">
                <input type="number" value={strokeStyle.width.toString()} onChange={(e)=>setItemProperty({...itemProperty,strokeStyle:{width:Number(e.target.value)}})}/>
                <select name="" id="">
                    <option value="inside">Inside</option>
                    <option value="outside">Outside</option>
                    <option value="center">Center</option>
                </select>
                <button className="more">...</button>
            </div>
            </div>
            <div className="item_effects_section">
                 <div className="row">
                     <label>Effects</label>
                 <select name="" id="">
                    <option value="inside">Drop Shadow</option>
                    <option value="outside">Inner Shadow</option>
                    <option value="center">Layer Blur</option>
                    <option value="center">Background Blur</option>
                </select>
                 </div>
            </div>
            <div className="item_export_section">

            </div>
            </>
               }
        </div>);
}

export default PropertyPanel;