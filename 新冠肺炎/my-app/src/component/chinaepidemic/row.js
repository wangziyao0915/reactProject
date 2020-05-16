import React, { useState } from 'react';
import styles from './index.module.css'

function Row(props){
    let {data}=props
    let {total,name,today,children}=data
    // console.log(data);
    
    let [isShowCity,setShowCity]=useState(false)
    let showCity=()=>{
        setShowCity(!isShowCity)
    }
        return (
           <div className='table-row'>
                <div onClick={showCity} className={styles['row']+' '+styles[isShowCity?'row-title-active':'row-title']}>
                    <span className={styles['highlight']}>{name}</span>
        <span className={styles['highlight']}>{today.confirm}</span>
                    <span>{total.confirm}</span>
                    <span>{total.heal}</span>
                    <span>{total.dead}</span>
                    <span>{total.deadRate}</span>
                </div>
                <div className={styles['fold-list']+' '+styles[isShowCity?'show':'']}>
                    {
                        children.map((item,index)=>{
                            return  <div className={styles['row']} key={'subrow'+index}>
                        <span>{item.name}</span>
                            <span>{item.today.confirm}</span>
                            <span>{item.total.confirm}</span>
                            <span>{item.total.heal}</span>
                            <span>{item.total.dead}</span>
                            <span>{item.total.deadRate}</span>
                        </div>
                        })
                    }
                           
                </div>
           </div>
        );
    
}

export default Row;