import { project } from "paper/dist/paper-core";

const Layers = () => {

    //  paths && paths.map((item)=>{
    //      console.log("item",item)
    //  })
    let paths = []
    let activeLayer = {}
  if(project)
  {
  paths = project?.activeLayer.children
  activeLayer = project?.activeLayer.children
  }
    return (
        <div className="layers">
            <h1>Layers</h1>
          {
              paths.length?paths.map((item)=>
              {
                  if(item.data.state!=="selection")
                  return(
                  <h1>{item.name}</h1>
              )}):<h1>Empty</h1>
          }
        </div>
    );
}

export default Layers;