import React, {PureComponent} from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import { InputItem, WingBlank, Button, WhiteSpace, Toast } from 'antd-mobile';
import {NO_COMPLETE} from '../../utils/enum.js'

import styles from './index.less';


@connect(({thing, loading}) => ({
  thing, 
  a: loading.effects['thing/addThing'],
}))
class Add extends PureComponent {


  state = {
    content: '',
  }

  // 添加
  toAdd = () => {
      const {dispatch} = this.props;
      const {content} = this.state
      dispatch({
          type: 'thing/addThing',
          payload: {
            content,
            complete_status: NO_COMPLETE,
          },
          callback: res => {
              if (res.error_code === 0) {
                Toast.success('添加成功', 1)
                dispatch(routerRedux.goBack())
              } else {
                Toast.info(res.msg)
              }
          }
      })
  }

  // 新增的内容
  inputChange = (val, key) => {
    this.setState({
        [key]: val,
    })
  }

  render() {
    return (
      <div>
        <h1 className={styles.title}>新增--todolist</h1>
        <InputItem
          clear
          placeholder="请输入待办事项"
          onChange={val => {this.inputChange(val, 'content')}}
        >待办事项</InputItem>
        
        <WingBlank>
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <Button type='primary' onClick={this.toAdd}>添加</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Add