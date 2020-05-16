let Grade =(state=[],action:{type:string,payload?:any})=>{
     if(action.type=="SAVE_GRAD"){
            console.log("rout",action.payload);
            
        return [...state,...action.payload]

     }
    
    
    return state
}
export default Grade