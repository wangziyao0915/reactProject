import React,{useEffect,useRef,useState} from 'react';
import LineChart from '../lineChart'
import styles from './index.module.css'
import {connect} from 'react-redux'
 function Slide(props) {
    let swiperNode=useRef()
    let [activeIndex,setActiveIndex]=useState(0)
    let page=['全国疫情<br/>新增趋势','累计确诊<br/>现有疫情','全国累计<br/>治愈/死亡','治愈率<br/>病死率']
    let [swiper,setSwiper]=useState(null)
    let changeSlide=(index)=>{
        // console.log(index);
        
        swiper&&swiper.slideTo(index)
    }

    let {chinaDayAddList,chinaDayList,dailyNewAddHistory,dailyDeadRateHistory}=props
   useEffect(()=>{
       let swiperInstance=new window.Swiper(swiperNode.current)
    setSwiper(swiperInstance)
    // console.log(swiper)
    swiperInstance.on('slideChange',()=>{
        setActiveIndex(swiperInstance.activeIndex)
    })
    return ()=>{
        swiperInstance.off('slideChange')
    }
   },[])
        return (
            <div>
                <div className="swiper-container" ref={swiperNode}>
                    <div className="swiper-wrapper">
                        <div className="swiper-slide"><LineChart list={chinaDayAddList} type={['confirm','suspect']}></LineChart></div>
                        <div className="swiper-slide"><LineChart list={chinaDayList} type={['confirm','suspect']}></LineChart></div>
                        <div className="swiper-slide"><LineChart list={chinaDayList} type={['confirm','suspect']}></LineChart></div>
                        <div className="swiper-slide"><LineChart list={chinaDayAddList} type={['dead','heal']}></LineChart></div>
                    </div>
            </div>
            <div className={styles["nav-cubic"]}>
                {
                    page.map((item,index)=>{
                    return  <div key={'slide'+index} onClick={()=>changeSlide(index)} className={styles[activeIndex===index?'nav-cubic-active':'']+' '+styles['nav-page']} dangerouslySetInnerHTML={{__html:item}}></div>
                    })
                }
                
            </div>
            </div>
        );
    
}
export default connect((state)=>{
    // console.log(state)
    return {
        chinaDayList:state.totalData.chinaDayList,
        chinaDayAddList:state.totalData.chinaDayAddList,
        dailyNewAddHistory:state.totalData.dailyNewAddHistory,
        dailyDeadRateHistory:state.totalData.dailyDeadRateHistory
    }
})(Slide)

