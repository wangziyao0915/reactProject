import React from 'react';
import styles from './index.module.css'
import {connect} from 'react-redux'
import {TOGGLE_DIALOG} from '../../store/types'
function DataSource(props) {
    let {color}=props
    let openDailog=()=>{
        props.dispatch({
            type:TOGGLE_DIALOG
        })
    }
        return (
            <p className={styles['qs']} style={{color:color}} onClick={()=>{
                openDailog({title:'title',content:'content'})
            }}>数据来:国家及各地卫健委每日信息发布</p>
        )
            
    
}

export default connect(null)(DataSource);