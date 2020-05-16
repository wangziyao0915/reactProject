import React,{useEffect,useState} from 'react'
import styles from './index.module.css'
const TopNav=(props)=>{
    let [active,setActive]=useState('#charts')
    let {type}=props
    let clsStr=type===1?styles['blue-white']:styles['white-blue']
    clsStr+=(' flex-center '+styles['top-nav'])
    useEffect(()=>{
        window.addEventListener('hashchange',()=>{
            setActive(window.location.hash)
        })
       
    },[])
    return (
        <div className={clsStr}>
            <a href="#charts" className={active==='#charts'?styles['active']:''}>疫情地图</a>
            <a href="#news" className={active==='#news'?styles['active']:''}>最新进展</a>
            <a href="#rumor" className={active==='#rumor'?styles['active']:''}>辟谣信息</a>
            <a href="#prevent" className={active==='#prevent'?styles['active']:''}>医疗预防</a>
        </div>
    )
}
export default TopNav 