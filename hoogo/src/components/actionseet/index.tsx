import React from "react"
import reactDom from "react-dom"
const ActionSheet=()=>{
    return (
        <div>
            <div></div>
            <div> <button>确定</button> <button>取消</button>  </div>
        
        </div>
    )
}


class ActionsheetServer{
constructor(){}
show(){
    let hangleDom = document.createElement("div")
    hangleDom.className="_actionsheet_"
     document.body.appendChild(hangleDom)
      reactDom.render(<ActionSheet/>,hangleDom)
    
}

}

let actionseet = new ActionsheetServer()
export default actionseet