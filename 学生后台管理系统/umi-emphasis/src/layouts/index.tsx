import React from 'react';
import styles from './index.css';
import router from 'umi/router'
import Cookies from 'js-cookie'
const BasicLayout: React.FC = props => {

  React.useEffect(()=>{
    if(!Cookies.get('loginId')){
      router.push('/login')
    }
  }, [])

  return (
    <div className={styles.normal}>
      {props.children}
    </div>
  );
};

export default BasicLayout;
