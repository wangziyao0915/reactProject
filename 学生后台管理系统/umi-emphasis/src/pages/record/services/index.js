export function fetchRecordApi(cid){
    return fetch(`/api/emstu/student/allrecordlists?cid=${cid}`).then(res=>res.json())
}

export function deleteRecord({record_id, stuid}){
    return fetch(`/api/emstu/student/deleterecord`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({record_id, stuid})
    }).then(res=>res.json())
}
