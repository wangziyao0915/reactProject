




const {appVersion}=window.navigator

const regexp=/(Android|iPhone)/g



if(regexp.test(appVersion)){
    document.body.className='mobile'
    
}else{
    document.body.className='PC'
   
}


