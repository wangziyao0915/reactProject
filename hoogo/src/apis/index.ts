export function savaGrade(data:[]){

 window.localStorage.setItem("gradelist", JSON.stringify(data)  ) 

console.log(data);
 


} 