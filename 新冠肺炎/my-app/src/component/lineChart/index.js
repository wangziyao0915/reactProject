import React, { useRef,useEffect } from 'react';
import styles from './index.module.css'
export default function LineChart(props) {

   let lineNode=useRef()

   let {list,type}=props
//    console.log(list)
   useEffect(()=>{
       if(!list) return
    let instance=window.echarts.init(lineNode.current)
    // console.log(lineNode.current)
    let option = {
        title: {
            text: '全国疫情新增趋势'
        },
       
        legend: {
            data: ['新增确诊', '新增疑似'],
            right:'20px',
            icon:'rect'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
       
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: list.map(item=>item.date)
        },
        yAxis: {
            type: 'value',
           axisLine:{
            show:false
           }
        },
        series: [
            {
                name: '新增确诊',
                type: 'line',
                stack: '总量',
                smooth:true,
                lineStyle:{
                    color:'rgb(233,72,79)',
                    width:4
                },
                itemStyle:{
                    borderWidth:3,
                    color:'rgb(233,72,79)',
                },
                data: list.map(item=>item[type[0]])
            },
            {
                name: '新增疑似',
                type: 'line',
                stack: '总量',
                smooth:true,
                lineStyle:{
                    color:'rgb(255,206,79)',
                    width:4
                },
                itemStyle:{
                    borderWidth:3,
                    color:'rgb(255,206,79)',
                },
                data: list.map(item=>item[type[1]])
            }
        ]
    };
    instance.setOption(option)
   },[list])
        return (
            <div className={styles['line-wrap']} ref={lineNode}>
                
            </div>
        );
    
}

