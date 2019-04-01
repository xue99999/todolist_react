import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile';

import styles from './index.less';
import { routerRedux } from 'dva/router';


@connect(({login, loading}) => ({
  login, 
  a: loading.effects['login/login'],
}))
class Login extends PureComponent {
  state = {
    account: '',
    secret: '',
    type: 100,
  }

  // 登录
  toLogin = () => {
    const {dispatch} = this.props;
    const {account, secret, type} = this.state;
    dispatch({
      type: 'login/login',
      payload: { account, secret, type },
      callback: res => {
        dispatch(routerRedux.push('/todo'))
      }
    })
  }

  // 去注册页面
  toRegister = () => {
    const {dispatch} = this.props;
    dispatch(routerRedux.push('/register'))
  }

  // 输入框
  inputChange = (val, key) => {
    this.setState({
      [key]: val.trim()
    })
  }

  render() {
    return (
      <div>
        <h1 className={styles.title}>todoList</h1>
        <InputItem
          clear
          placeholder="请输入邮箱"
          onChange={val => {this.inputChange(val, 'account')}}
        >账号</InputItem>
        <InputItem
          type="password"
          clear
          placeholder="请输入密码"
          onChange={val => {this.inputChange(val, 'secret')}}
        >密码</InputItem>
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WingBlank>
          <Button type="primary" onClick={this.toLogin}>登录</Button>
        </WingBlank>
        <div className={styles.footer}>
          还没有账号？<span className={styles.register_btn} onClick={this.toRegister}>立即注册</span>
        </div>
      </div>
    )
  }
}

export default Login