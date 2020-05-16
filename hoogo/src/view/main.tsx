import React from "react"
import "./style.css"
import { Link } from 'react-router-dom'


let arr=[
    {title:"收费制单",to:"/toll"},
    {title:"制单历史",to:"/history"},
    {title:"退出登录",to:"/quit"}

]


interface listTimeProps {
    title:string,
    to:string,
 
    
    }

function Examlek(){
 return  console.log(React);





}





class ListItem extends React.Component{
   
    props:listTimeProps={title:"",to:""}
   
    render(){
              let {title}=this.props
              let {to}=this.props
   
        return React.createElement("div",{className:"list"},[ 
            React.createElement("i"),
            React.createElement(Link,{to},title),
            React.createElement("span")

        ])
    }
}





let List:React.FC=()=>{
  

  
   return  React.createElement("div",{}, arr.map((item,index)=>{  
   return  React.createElement(ListItem,{key:"Listitem"+index,title:item.title,to:item.to})           

     
})
)
   
  
 
}




 class Mine extends React.Component {
    name="min"
     render(){
         
            return   React.createElement("div",{className:"page",key:"min1"},[
             React.createElement("div",{key:"min2" ,className:"title"},"北京第二幼儿园"),
             React.createElement("img",{src: require("../img/人物@2x.png"),className:"headimg"}, ),
             React.createElement("div",{key:"min3",className:"name"},"奇怪名字吧"),
              
            
            React.createElement(List)
         
           

         ])
     } 
 }



export default Mine