import React, {useEffect} from 'react';
import LineImg from '../lineImg/index.jsx';
import './index.css';

const Slice = () => {

    useEffect(() => {
        let mySwiper = new window.Swiper('.swiper-container');
    }, [])

    return <div className='slice_box' style={{height: '450px'}}>
        <div className="swiper-container">
            <div className="swiper-wrapper">
                <div className="swiper-slide">
                    <div className='swiper-line'><LineImg></LineImg></div>
                </div>
                <div className="swiper-slide">
                    <div><LineImg></LineImg></div>
                </div>
                <div className="swiper-slide">
                    <div><LineImg></LineImg></div>
                </div>
                <div className="swiper-slide">
                    <div><LineImg></LineImg></div>
                </div>
            </div>
        </div>
    </div>
}

export default Slice;