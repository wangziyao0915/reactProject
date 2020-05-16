import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import router from 'umi/router';
import Cookies from 'js-cookie'

class NormalLoginForm extends React.Component {
  goLogin = ({ username, password }) => {
    fetch('/api/emstu/teacher/login', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        username,
        password,
      })
    }).then(res => res.json()).then((res) => {

      if (res.code === 1) {
        message.success('登陆成功！', 1, () => {
          fetch('/api/emstu/teacher/checkuser').then(res => res.json()).then(res => {
            console.log(res)
            if (res.code === 1) {
              // 本地存储
              Cookies.set('loginId', res.useinfo.tid, {expires: 1})

              router.push('/home')
            } else {
              message.error(res.msg)
            }
          })
        })
      } else {
        message.error(res.msg)
      }
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.goLogin(values)
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
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm
