import React, {useEffect, useRef} from 'react'
import {getRecordLists} from '../../services'

// 使用hook时候的注意事项， 项目中所遇到的难点

const Charts = (props)=>{
    
    let chartDom = useRef()
    // mounted 生命周期
    useEffect(()=>{
        let {cid, stuid, stuName} = props
        // 1. 创建一个echart实例
        let instance = window.echarts.getInstanceByDom(chartDom.current) || window.echarts.init(chartDom.current);
        
        // 2. 配置数据
        let option = {
            title: {
                text: `姓名：${stuName}`,
                left: '20px',
                top: '10px',
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                show: false,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend:{
                type: 'plain',
                data:[
                    {name:"技能成绩", icon:"pin"},
                    {name:"理论成绩",icon:"pin"},
                ],
                top: "20px"
            },
            xAxis: {
                type: 'category',
                data: [],
                boundaryGap: false
            },
            yAxis: {
                type: 'value',
                
            },
            series: [{
                name: "技能成绩",
                data: [],
                type: 'line',
                itemStyle:{
                    color: 'blue',

                }
            },{
                name: "理论成绩",
                data: [],
                type: 'line',
                // smooth: true,
                itemStyle:{
                    color: 'purple',
                    
                }
            }]
        };
        instance.showLoading()
        getRecordLists({cid, stuid}).then(res=>{
            option.xAxis.data = res.lists.map((item)=>item.record_date)
            option.series[0].data = res.lists.map((item)=>item.skill_score)
            option.series[1].data = res.lists.map((item)=>item.theory_score)

            // 3. 配置相应数据，绘制图表
            instance.setOption(option)
            instance.hideLoading()
        })
        // 图表的自适应， 遇到神奇问题（基本功不够）
        window.addEventListener("resize", () => { 
            // 多图表自适应需要使用addEventListener
            instance.resize(); 
        });

        // window.onresize = instance.resize
        return ()=>{
            // instance.dispose()
        }
    },[props])
    
    return <div className="chart-wrapper" style={{width: "100%", height: "100%"}} ref={chartDom}></div>
}

export default Charts