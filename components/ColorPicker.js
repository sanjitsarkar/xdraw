import { useContext } from 'react';
import { SketchPicker } from 'react-color'
import { ColorContext } from '../store/ColorStore';
import { ColorTypeContext } from '../store/ColorTypeStore';
import { ItemPropertyContext } from '../store/ItemPropertyStore';
import { FILL_COLOR } from '../utility/Constants';
const ColorPicker = () => {
const {colorType} = useContext(ColorTypeContext)

    const {itemProperty,setItemProperty} = useContext(ItemPropertyContext)
    const {fillStyle,strokeStyle} = itemProperty
       return(
           (<SketchPicker disableAlpha={false} className="color_picker" 
           color={colorType===FILL_COLOR?fillStyle.color:strokeStyle.color} 
           onChange={(_color)=>colorType===FILL_COLOR ?
            setItemProperty({...itemProperty,fillStyle:{color:_color.hex}}):
            setItemProperty({...itemProperty,strokeStyle:{color:_color.hex}})}
            onChangeComplete={(_color)=>{colorType===FILL_COLOR ?
            setItemProperty({...itemProperty,fillStyle:{color:_color.hex}}):
            setItemProperty({...itemProperty,strokeStyle:{color:_color.hex}})}}
            />))
    
            
            
        
        
     

}

export default ColorPicker;