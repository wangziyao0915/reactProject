import React, { useEffect,useRef,useState } from 'react';
import Row from './row'
import styles from './index.module.css'
import {connect} from 'react-redux'
function ChinaEpidemic(props) {
    let {chinaData}=props
    // console.log(chinaData);
    let stictyBar=useRef()
    let dataTable=useRef()
    // {position:'fixed',top:'96px'}
    let [dataTableHeight,setDataTableHeight]=useState(0)
    let [stictyBarStyle,setStictyBarStyle]=useState({})
    
    useEffect(()=>{
        let styckyTop=stictyBar.current.offsetTop
        // console.log(stictyBar.current.offsetTop);
        window.addEventListener('scroll',()=>{
            let st=document.documentElement.scrollTop
            if(styckyTop<st&&st<dataTableHeight){
                setStictyBarStyle({position:'fixed',top:'96px',zIndex:'999'})
            }else{
                setStictyBarStyle({})
            }
        })
        
    },[dataTableHeight])
    useEffect(()=>{
        if(chinaData.length>0){
            setDataTableHeight(dataTable.current.offsetHeight+dataTable.current.offsetTop)
        }
    },[chinaData])
        return (
            <div>
                <div className='title'>中国疫情</div>
                    <div className='sub-title'>7-10点为更新高峰，数据如有滞后敬请谅解</div>
                    <div className='data-title'>
                        <div className={styles['data-title-head']+' '+styles['row']} ref={stictyBar} style={stictyBarStyle}>
                            <span className={styles['highlight']}>地区</span>
                            <span className={styles['highlight']}>新增确诊</span>
                            <span>累计确诊</span>
                            <span>治愈</span>
                            <span>死亡</span>
                            <span>病死率</span>
                        </div>
                        <div className='data-title-list' ref={dataTable}>
                            {
                                chinaData.map((item,index)=> <Row key={'row'+index} data={item}></Row>)
                            }
                           
                        </div>
                </div>
            </div>
        );
    
}

export default connect(state=>{
    return {
        chinaData:state.areaTree[0]?state.areaTree[0].children:[]
    }
})(ChinaEpidemic);