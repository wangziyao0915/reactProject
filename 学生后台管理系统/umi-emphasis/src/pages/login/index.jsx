import React, {useState} from 'react'
import {connect} from 'dva'
import {Layout, Row, Col} from 'antd'
import LoginForm from './loginComponent.js'
import RegisterForm from './registerComponent.js'

let {Header, Content, Footer} = Layout
const Login = (props)=>{
    let [isLogin, toggleLogin] = useState(true)

    return (
        <Layout style={{height: '100%'}}>
            <Header>登陆与注册</Header>
            <Content style={{display:'flex', alignItems:"center"}}>
                <Row type="flex" justify="center" style={{width: '100%'}}>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <div style={{textAlign:'center'}}>
                            <h1><span onClick={()=>{toggleLogin(true)}}>login</span> ｜ <span onClick={()=>{toggleLogin(false)}}>register</span></h1>
                            {isLogin ? <LoginForm></LoginForm>:<RegisterForm></RegisterForm>}
                        </div>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            
            </Content>
            <Footer style={{textAlign:'center', borderTop:"1px solid #ddd"}}>网站工程学院<span aria-label="权限" role="img">©️</span></Footer>
        </Layout>
    )
}

export default connect((state)=>{
    // console.log(state)
    return {}
})(Login)
