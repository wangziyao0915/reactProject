//获取讲师名下所有班级列表
export function fetchClass(url:string){
    return fetch("/api/emstu/class/lists").then(res=>res.json())
}

// 根据CID删除指定班级
export function deleteClass(cid:string){
    return fetch('/api/emstu/class/delete',{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({cid})
    }).then(res=>res.json())
}

// 根据班级查找学生
export function emStudents(cid:string){
    return fetch(`/api/emstu/student/lists?cid=${cid}`).then(res=>res.json())
}

// 删除学生
export function delStudent(params:{cid:string, stuid:string}){
    return fetch(`/api/emstu/student/delete`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(params)
    }).then(res=>res.json())
}
