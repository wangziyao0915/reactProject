import React, { useState } from "react"
import { Button, Alert } from 'antd'
import {connect} from 'dva'

interface Props{
    lists:any[],
    classid:string,
    cid:string,
    deleteStudent:(cid:string,stuid:string)=>void
}

const students = (props:Props)=>{
    const {lists, classid, cid, deleteStudent} = props;
    let [deleteIconType, setDeleteIcon] = useState(false)
    let editStudents = (edit_type:boolean, class_name:string)=>{
        setDeleteIcon(!edit_type)
    }

    return (
        <div>
            <div>
                {lists && lists.map((item:any) => <Button type={deleteIconType?"danger":"dashed"} onClick={()=>{deleteIconType && deleteStudent(cid,item.stuid)}} icon={deleteIconType?'close-square':''} style={{margin:"0 10px"}} key={item.stuid}>{item.stu_name}</Button>)}
            </div>
            <div style={{textAlign:"right"}}>
                <div style={{display:"inline-block", margin:"0 10px"}} >
                    {deleteIconType && <Alert closable={true} message="删除学生会同时删除其名下的所有成绩！" type="warning" />}
                </div>
                <Button onClick={()=>{ editStudents(deleteIconType, classid) }} type="primary" size="default">{deleteIconType?"完成":"编辑"}</Button>
            </div>
        </div>
    )
}

export default connect(null, (dispatch)=>{
    return {
        deleteStudent(cid:string,stuid:string) {
            dispatch({
                type:"classEdit/deleteStudentAction",
                payload:{cid, stuid}
            })
        }
    }
})(students)
