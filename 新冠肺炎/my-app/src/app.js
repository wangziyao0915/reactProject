import React, { useEffect, useState } from "react"
import './app.css'
import TopNav from './component/topNav'
import DataSource from './component/dataSource'
import Dialog from './component/dialog'
import { connect } from 'react-redux'
import ChinaMap from './component/chinaMap'
import Slide from './component/slide'
import ChinaEpidemic from './component/chinaepidemic'
import TimeLine from './component/timeLine'
function App(props) {
    let { fetchTotalData ,isOpen} = props
    let [scaleStyle, setScaleStyle] = useState({})
    useEffect(() => {
        let appType = document.body.className
        let adjustPage=()=>{
            if (appType === 'mobile'||(appType === 'PC'&&window.innerWidth<750)) {
                let scale = window.innerWidth / 750
                    setScaleStyle({
                        transform:`scale(${scale})`
                    })
                
            }else{
                setScaleStyle({
                    transform:'none'
                })
            }
        }

        window.addEventListener('resize',adjustPage)
        window.addEventListener('load',adjustPage)

        fetchTotalData()
    }, [])

    return (<div className="App" style={scaleStyle}>

        <div id="charts" className='header'>
            <div style={{position:'absolute',top:'280px',left:'50px'}}>
            <DataSource color="#fff"></DataSource>
            </div>
           
        </div>
        <div className='display-data'>
            数据展示
            <div className='place'>疫情数据</div>
            <TopNav type={2}></TopNav>
            <ChinaMap></ChinaMap>
            <Slide></Slide>
            <Slide></Slide>
            <DataSource color='#000'></DataSource>
            <TimeLine></TimeLine>
            <ChinaEpidemic></ChinaEpidemic>
            <div>
                海外疫情
            </div>
        </div>

        <div id="news">
            <div className='place'></div>
            最新进展
           </div>
        <div id="rumor">
            <div className='place'></div>
            辟谣信息
           </div>
        <div id="prevent">
            <div className='place'></div>
            医疗预防
           </div>
        <div className='fixed-ele'>
            <TopNav type={1}></TopNav>
        </div>
        {
            isOpen&& <Dialog>
             <h2>数据说明</h2>
             <div className="content">
                 <p className="h2"><span className="bold">数据来源：</span>全部数据来源于国家卫健委、各省市区卫健委、各省市区政府以及港澳台官方渠道。</p>
                 <p className="h2"><span className="bold">实时数据方面，腾讯新闻的统计方法如下：</span></p>
                 <p><em>1.</em> 国家卫健委公布数据时，全国总数与国家卫健委保持一致。<br />
                     <em>2.</em> 各省卫健委陆续公布数据，如果各省数据总和已经超过之前国家卫健委总数，则直接使用各省数据总和作为全国总数。（“疑似病例”仅使用国家卫健委每天公布的共有疑似病例总数，而不做新增累计）<br />
                     <em>3.</em> “全国确诊”、“治愈人数”和“死亡人数”的“较上日”是指每两天间的新增数值，由当前的全国总数减去国家卫健委前一天公布的数据得到。这个值会随着全国总数的变动而实时变化。<br />
                     <em>4.</em> 疑似病例的“较上日”数据取自国家卫健委每日最新公布的“新增疑似病例数”。点击【疑似病例】可查看较上日现有疑似病例数的绝对值差额。<br />
                     <em>5.</em> 各省卫健委公布数据的发布时间和统计时间段各不相同，故而会在部分时段出现国家总数不等于分省数据之和。</p>
                 <p className="h2"><span className="bold">疫情趋势图：</span></p>
                 <p>1.  实时更新的当前计确诊/治愈/死亡数据不同，疫情新增趋势、累计确诊/疑似/治愈/死亡趋势图只使用国家和各省市区卫健委的数据，每天更新一次。</p>
                 <p>2. 治愈率 = 截至当日累计治愈人数 / 截至当日累计确诊人数。</p>
                 <p>3. 病死率 = 截至当日累计死亡人数 / 截至当日累计确诊人数。</p>
                 <p>4. 新增确诊变化率 = （昨日新增确诊数 - 前日新增确诊数）/ 昨日新增确诊数</p>
                 <p>如果大家发现相关数据错误，欢迎即时联系我们。反馈入口：进入微信搜索“腾讯新闻App”微信公众号，直接留言反馈即可。</p>
 
 
 
             </div>
         </Dialog>
        }
       

    </div>);

}
export default connect((state) => {
    // console.log(state);
    return {
        isOpen:state.dialog
    }

}, (dispatch) => {
    return {
        fetchTotalData() {
            dispatch({
                type: "FETCH_TOTAL_DATA"
            })
        }
    }
})(App)