import React from 'react';
import './index.css';

const NavTop = (props) => {
    let {type} = props;
    let classAll = 'navtop ' + (type === 1 ? 'blue_white' : 'white_blue');

    return <div className={classAll}>
        <a href="#map" className="blue_white_active">疫情地图</a>
        <a href="#news" className="white_blue_active">最新进展</a>
        <a href="#rumours">辟谣信息</a>
        <a href="#prevent">医疗预防</a>
    </div>
}

export default NavTop;