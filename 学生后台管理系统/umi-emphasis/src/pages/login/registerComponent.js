import React from 'react'

import { Form, Icon, Input, Button, Checkbox, notification, message } from 'antd';

class NormalLoginForm extends React.Component {
  goRegister = ({username,password, phone=''})=>{
    fetch('/api/emstu/teacher/register', {
        method: "POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify({
            username,
            password,
            phone
        })
    }).then(res=>res.json()).then(res=>{
      if(res.code === 1){
        message.success(res.msg)
      }else{
        message.error(res.msg)
      }
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(values.password!==values.rpassword){
          notification.warn({
            message: '提示',
            description:
              '请输入相同的密码',
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
        }else{
          this.goRegister(values)
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('rpassword', {
            rules: [{ required: true, message: 'Please repeat your Password!'}],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Repeat Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your Phone Number!'}],
          })(
            <Input
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="phone"
              placeholder="请输入电话"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Button type="primary" htmlType="submit" className="login-form-button">
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm
