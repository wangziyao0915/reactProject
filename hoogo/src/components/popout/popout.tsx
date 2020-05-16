import React,{forwardRef,useState,useEffect} from "react"

import "./popout.css"


interface popdata{
    addpop:any,
    ref?:any,
    submit:any,
    item:number,
    index:number,

}



const Popout:React.FC<popdata>=(props:popdata,ref)=>{
let {index,item}= props
 

    
    
    let {submit} = props

    let [costName,setcostName]= useState("")
    let [costPrice,setcostPrice]= useState("")

    useEffect(()=>{
     
        submit(costName,costPrice)
            
 
        
         
        
    },[costName,costPrice])
    

    return (
      
        <div className="popout">
                         <div className="popdiv">
                             <p>
                                <input type="text"  value={costName} onChange={(e)=>{setcostName(e.target.value)}}  ></input>|
                                 <input type="text" value={costPrice} onChange={(e)=>{setcostPrice(e.target.value)}}></input>
                                

                                  <span onClick={()=> {props.addpop   ({  type: index==0?"ADD_ITEM":"DELETE_ITEM",payload:item})
                                
                                    if(index!==0){
                                        submit(costName,costPrice,true)
                                    }
                                } }> {index==0 ? "+" :"-"} </span>
                                </p>
                          </div>
        
        
        
                    </div>
    )

}




export default forwardRef(Popout) 