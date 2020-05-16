// 获取班级列表
export function getClassList(){
    return fetch('/api/emstu/class/lists').then(res => res.json())
}

// 创建班级
export function createClass(params){
    return fetch('/api/emstu/class/create', {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

 // 添加学生接口
export function addStudent(params){
    return fetch('/api/emstu/student/add',{
        method: "PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(params)
    }).then(res=>res.json())
}

// 添加成绩接口
export function addRecord(params){
    return fetch('/api/emstu/student/addrecord',{
        method: "PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(params)
    }).then(res=>res.json())
}

// 获取对应班级的重点学生列表
export function getStudentList(cid){
    return fetch(`/api/emstu/student/lists?cid=${cid}`).then(res=>res.json())
}

// 获取成绩列表
export function getRecordList(cid){
    return fetch(`/api/emstu/student/recordlists?cid=${cid}`).then(res=>res.json())
}

// 退出
export function logout(){
    return fetch('/api/emstu/teacher/logout').then(res=>res.json())
}