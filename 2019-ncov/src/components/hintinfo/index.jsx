import React from 'react';

const HintInfo = (props) => {
    let {title, ht} = props;
    let isSrc = ht === 'f' ? '2' : '';

    return <div className="info" style={{color: ht === 'f' ? '#fff' : '#737373'}}>
        <p>数据来源：{title}</p>
        <img src={`https://mat1.gtimg.com/news/images/inews/2020/feiyan/18/img/icon_qs${isSrc}.png`} />
    </div>
}

export default HintInfo;