
import React, { useState, useEffect,  useReducer, useRef  } from "react"
import {connect} from "react-redux"
import "./styleToll.css"
import Model from "../model/model"
import Popout from "../../components/popout/popout"
import actionseet from "../../components/actionseet/"

interface saveGrade{
    saveGrade:([])=>void
 
}

interface popdata {
    type: string,
    payload: any,

}

const Toll: React.FC<saveGrade> = (props) => {
    let {saveGrade} =props

    let [inistate, display] = useReducer((state: [], action: popdata): any => {
       let newdata: number[] = [...state]   
        if (action.type == "ADD_ITEM") {           
            console.log("oldadd",newdata);             
            newdata.push(new Date().getTime())
            console.log("add",newdata);       
        }
      
        if (action.type == "DELETE_ITEM") {              
            let index = newdata.findIndex(arr => arr === action.payload)         
              newdata.splice(index,1)                      
        }
        return newdata

    }, [new Date().getTime()])

    
    let [allDate, setAllDate] = useState({
        feePanName: "",
        feeItems: ({} as {[propName:string]:any})
    })

   useEffect(()=>{
     console.log("updatainistte",inistate)
   },[inistate])
//定义显示弹框与弹框消失的数据

   let [pooOutFlag,setPooOutFlag] = useState(false)
  let ChargeClass=()=>{

     console.log(53,actionseet.show);
     actionseet.show()

   }






    return <div className="toll">

        <div className="main">
            <div className="head">
                <p> <span>收费方案一 </span>  <input type="text" className=""></input>  <img src={require("../../img/图层3拷贝@2x.png")}></img>  </p>
                <p>  <span>收费名称 </span> <input type="text" className="" placeholder="请输入幼儿园2018年"></input>   </p>
            </div>
            <div className="body">
                <div className="addGrade"> <span >收费年级:</span><input onClick={()=>ChargeClass()}   className="" type="text"></input>  <span onClick={()=>{setPooOutFlag(true)
                
                }}> <img src={require("../../img/圆角矩形13@2x.png")}></img>  </span> </div>


                {inistate.map((item: number, index: number) => {
                    return <Popout addpop={display} key={item} item={item} index={index}  submit={(costName: string, costPrice: any,isDelete:false) => {
                        if(isDelete){   
                            delete allDate.feeItems[costName]                      
                        }else                     
                        if (costName && costPrice) {
                            setAllDate(
                                {
                                    ...allDate,
                                    feeItems: {
                                        ...allDate.feeItems,
                                        [costName]: costPrice
                                    }
                                }
                            )
                        }
                                           
                    }}></Popout>

                })}


            </div>

                
            
            {pooOutFlag && <Model code={(Arrgrade:[])=>{setPooOutFlag(false);saveGrade(Arrgrade)
            saveGrade(Arrgrade)
            }} ></Model>}
           
        </div>
        <div className="radius">  <span>+  </span>  </div>
        <div className="complete">  <p> 完成制单</p></div>



    </div>

}




export default connect((state:any)=>{
return state


} ,(dispatch:any)=>{
return {
saveGrade(payload:[]){
    dispatch({
        type:"SAVE_GRADE_TO_LOCAL",
        payload
    })  
}

}

} )(Toll)   