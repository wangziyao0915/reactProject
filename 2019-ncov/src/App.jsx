import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import NavTop from './components/navtop/index.jsx';
import HintInfo from './components/hintinfo/index.jsx';
import ChinaMap from './components/chinamap/index.jsx';
import Slice from './components/slice/index.jsx';

const App = (props) => {
    let {getChinaData} = props;

    useEffect(() => {
        getChinaData();
    },[])

    return (
        <div className="App">
            <div className="navs">
                <NavTop type={1}></NavTop>
            </div>
            <div className="app_head">
                <div className="app_img">
                    <HintInfo title="国家及各地卫健委每日信息发布" ht='f'></HintInfo>
                </div>
            </div>
            <div id="map">
                <div className="map_box"></div>
                <NavTop type={2}></NavTop>
                <div className="china_map">
                    <ChinaMap></ChinaMap>
                </div>
                <div className='slice'>
                    <Slice></Slice>
                </div>
                <HintInfo title="国家卫健委官网发布，每日更新一次" ht='c'></HintInfo>
            </div>
            <div id="news">
                <div className="news_box"></div>
                news
            </div>
            <div id="rumours">
                <div className="rumours_box"></div>
                rumours
            </div>
            <div id="prevent">
                <div className="prevent_box"></div>
                prevent
            </div>
        </div>
    );
}

export default connect((state) => {
    console.log(state);
    return {
        state
    }
}, (dispatch) => {
    return {
        getChinaData(){
            dispatch({
                type:'GET_CHINA_DATA'
            })
        }
    }
})(App);
