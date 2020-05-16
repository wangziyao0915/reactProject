import React, {useRef, useEffect} from 'react';

const LineImg = () => {
    let lineRef = useRef();

    useEffect(() => {
        let myCharts = window.echarts.init(lineRef.current);

        let option = {
            title: {
                text: '折线图堆叠',
                top: '5%',
                left: '2%',
                textStyle: {
                    fontSize: 28
                }
            },
            legend: {
                top: '5%',
                right: '3%',
                icon: 'roundRect',
                itemWidth: 20,
                itemHeight: 20,
                textStyle: {
                    color: '#737373',
                    fontSize: 20
                },
                data: ['邮件营销', '联盟广告']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '12%',
                top: '20%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    fontSize: 16,
                    color: '#777',
                    rotate: 45,
                    margin: 20
                },
                axisTick: {
                    show: false
                },
                data: ['1', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisLabel: {
                    fontSize: 16,
                    color: '#555'
                },
                axisTick: {
                    show: false
                }
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210],
                    symbolSize: 8,
                    itemStyle: {
                        color: '#f06061',
                        borderWidth: 1.3
                    },
                    smooth: true,
                    lineStyle: {
                        width: 4
                    }
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310],
                    symbolSize: 8,
                    itemStyle: {
                        color: '#ffd661',
                        borderWidth: 1.3
                    },
                    smooth: true,
                    lineStyle: {
                        width: 4
                    }
                }
            ]
        };

        myCharts.setOption(option);
    }, [])

    return <div className='line_img' ref={lineRef} style={{height: '400px'}}>
        
    </div>
}

export default LineImg;