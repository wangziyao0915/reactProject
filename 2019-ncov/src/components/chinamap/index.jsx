import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';

const ChinaMap = (props) => {
    let {areaTree} = props;
    let echartsRef = useRef();

    useEffect(() => {
        let myEcharts = window.echarts.init(echartsRef.current);

        let option = {
            tooltip: {
                show: true,
                trigger: 'item',
                triggerOn: 'click',
                formatter: ''
            },
            visualMap: {
                type: 'piecewise',
                left:'3%',
                pieces:[
                    {gt: 10000, color: '#9c0a0d', label: '10000人及以上'}, 
                    {gt: 999, lte: 9999, color: '#c91014', label: '1000-9999人'},
                    {gt: 499, lte: 999, color: '#e64b47', label: '500-999人'},
                    {gt: 99, lte: 499, color: '#fe8664', label: '100-499人'},
                    {gt: 9, lte: 99, color: '#ffd2a0', label: '10-99人'},
                    {gt: 0, lte: 9, color: '#ffefd7', label: '1-9人'},
                ]
            },
            series: [{
                name: '中国地图',
                type: 'map',
                aspectScale: 0.75,
                top: '2%',
                bottom: -200,
                left:'3%',
                right:'5%',
                mapType: 'china', // 自定义扩展图表类型
                label: { show: true },
                zoom: 1,
                data: areaTree[0] && areaTree[0].children.map(item => {
                    return {name:item.name, value:item.total.confirm}
                })
            }]
        }

        myEcharts.setOption(option)
    },[areaTree])

    return <div className="china_map" ref={echartsRef} style={{height:'600px'}}>
    </div>
}

export default connect((state) => {
    let {areaTree} = state;
    return {
        areaTree
    }
}, null)(ChinaMap);