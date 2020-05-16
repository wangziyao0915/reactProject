import React from 'react';
import './index.css'
import { connect } from 'react-redux';
import {TOGGLE_DIALOG} from '../../store/types'
 function Dialog(props) {
    let {title,children}=props;
    let closeDialog=()=>{
        props.dispatch({
            type:TOGGLE_DIALOG
        })
    } 
        return (
            <div className='dialog-masker' onClick={closeDialog}>
                <div className='dialog-wrap' onClick={(e)=>{e.stopPropagation()}}>
                    <div className='dialod-title'>{title}</div>
                    <div className='dialod-content'>{children}</div>
                    <span><img src="https://mat1.gtimg.com/news/zhishiguan/page/icon_pop_close.png" alt=""/></span>
                </div>
            </div>
        );
    
}
export default connect(null)(Dialog)
