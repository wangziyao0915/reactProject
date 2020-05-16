


export function JSONP(url,callbackName){

    return new Promise((resolve,reject)=>{
        let scriptNode=document.createElement('script');
        scriptNode.src=url+`&callback=${callbackName}`;
        window[callbackName]=function(data){
            document.body.removeChild(scriptNode)
            if(data.ret===0){
                resolve(JSON.parse(data.data))
            }else{
                alert('jsonp fetch error')
            }
            
        }
       
        document.body.appendChild(scriptNode)
        
    })

    
}