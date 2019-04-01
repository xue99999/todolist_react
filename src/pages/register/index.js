import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {InputItem, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';

import styles from './index.less';
import { routerRedux } from 'dva/router';


@connect(({register, loading}) => ({
  register, 
  a: loading.effects['register/register'],
}))
class Register extends PureComponent {
  state = {
    // 用户名， 注册需要
    nickname: '',
    account: '',
    secret: '',
    // 默认注册邮箱
    type: 100,
  }

  // 注册账号
  toRegister = () => {
    const {dispatch} = this.props;
    const {nickname, account, secret, type} = this.state;
    dispatch({
      type: 'register/register',
      payload: { nickname, account, secret, type },
      callback: res => {
        const {error_code = '', msg=''} = res
        if (error_code === 0) {
          dispatch(routerRedux.push('/login'))
        } else {
          Toast.info(msg, 1)
        }
      }
    })
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
          placeholder="请输入用户名"
          onChange={val => {this.inputChange(val, 'nickname')}}
        >用户名</InputItem>
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
          <Button type="primary" onClick={this.toRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register