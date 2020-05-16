import React, { useState, useEffect } from "react"
import "./model.css"

interface modeldata {
    code: any

}



const Model: React.FC<modeldata> = (props: modeldata) => {
    
    
    let { code } = props

    let [Arrgrade, getArrgrade] = useState([] as any)  //添加班级后的数组
    let [valuedata, getvaluedata] = useState("")   //input的框的数据
    let [inputFlag, setinputFlag] = useState(false) //显示隐藏input

    useEffect(() => {
        console.log(17, Arrgrade);

    }, [Arrgrade])


    return (
        <div className="model">
            <div className="box">
                <h4>年纪名称</h4>
                <div className="addGradeBox">
                    {Arrgrade.map((item: string, index: number) => {
                        return <p key={index}>  <span>{item}</span>  <span onClick={() => {
                            Arrgrade.splice(index, 1)
                            getArrgrade([...Arrgrade])
      
                        }}> <img src={require("../../img/椭圆5@2x.png")} ></img></span>    </p>
                    })}


                    {inputFlag && <div className="EnterClass"> <input type="text" value={valuedata} onChange={(e) => { getvaluedata(e.target.value) }}></input> <span onClick={() => {

                        getArrgrade([...Arrgrade, valuedata])
                        getvaluedata("")
                        setinputFlag(false)
                    }}>   <img src={require("../../img/椭圆7拷贝2@2x.png")}></img>   </span> </div>}
                    <span className="modeladdGrade" onClick={()=>{setinputFlag(true)}} > +添加年级  </span>
                </div>
                <div className="addClick">
               
                    <button  onClick={code} >取消</button> <button onClick={() => {code(Arrgrade)}}>保存</button>
                </div>
            </div>
        </div>
    )


}

export default Model