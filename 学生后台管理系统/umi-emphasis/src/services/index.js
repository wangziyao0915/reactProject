// 根据班级和学生查找成绩列表
export function getRecordLists({stuid,cid}){
    return fetch(`/api/emstu/student/recordlists?cid=${cid}&stuid=${stuid}`).then(res=>res.json())
}
