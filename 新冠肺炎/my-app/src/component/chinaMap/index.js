import React, { useEffect,useRef } from 'react';

// import ChinaDataJson from "../../../public/china"
import {connect} from "react-redux"
 function ChinaMap(props){
     let {chinaData}=props
    let mapNode=useRef()
    useEffect(()=>{
        
        let data
        let instance=window.echarts.init(mapNode.current)
        instance.on('click',(params)=>{
            console.log(params);
            
        })
        let option = {
            grid:{
                left:"5%",
                right: "5%"
            },
            tooltip:{
                show: true,
                trigger: "item",
                triggerOn:"click",
                enterable: "true",
                formatter:function(params){
                    console.log(params)
                    return `<div><span>${params.name}</span><span>${params.value}确诊</span><br/><a target="_blank" href="https://www.baidu.com">详情</a></div>`
                }
            },
            visualMap: {
                left: 'left',
                 show: false,
                type:"piecewise",
                pieces: [
                    {gt: 10000, color: '#9c0a0d', label: '10000以上'},            // (1500, Infinity]
                    {gt: 1000, lte: 9999, color: '#c91014', label: '1000 - 9999'},  // (900, 1500]
                    {gt: 500, lte: 999, color: '#e64b47',  label: '500 - 999'},  // (310, 1000]
                    {gt: 100, lte: 499, color: '#fe8664', label: '100 - 499'},   // (200, 300]
                    {gt: 10, lte: 99, color:'#ffd2a0', label: '10 - 99'},       // (10, 200]
                    {lt: 9, color:'#ffefd7', label: '1-9'}                 // (-Infinity, 5)
                ],
                inRange: {
                    color: ['#ffefd7','#ffd2a0', '#fe8664','#e64b47','#c91014','#9c0a0d' ]
                }
            },
            series: [
                {
                    name: '中国地图',
                    type: 'map',
                    aspectScale: 0.75,
                    top: '2%',
                    bottom: -200,
                    mapType: 'china', // 自定义扩展图表类型
                    label: {
                        show: true
                    },
                    zoom: 1,
                    data: data
                }
            ]
        }
        instance.setOption(option)
      if(chinaData){
        data=chinaData.children.map(item=>{
            return {
                name:item.name,value:item.total.confirm
            }
        })
        
        
      }
        // console.log(mapNode.current);
        
    },[])
   
        return (
            <div style={{height:'520px',width:'700px',border:"1px solid #ccc"}} ref={mapNode}>
                
            </div>
        );
    
}

export default connect((state)=>{
    return {
        chinaData:state.areaTree[0]
    }
})(ChinaMap)

