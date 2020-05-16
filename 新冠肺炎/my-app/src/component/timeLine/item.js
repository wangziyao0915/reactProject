import React from 'react';
import styles from './index.module.css'
function TimeLineItem(props) {
    let {title,children,isLast}=props
        return (
            <div className={styles['item-wrap']+' '+styles[isLast?'no-trail':'']}>
                    <div className={styles['item-title']}>
                        {title}
                    </div>
                    <div className={styles['item-content']}>
                        {children}
                    </div>
            </div>
        );
    
}

export default TimeLineItem;