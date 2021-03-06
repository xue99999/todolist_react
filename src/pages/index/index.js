import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, WingBlank, Button, WhiteSpace, Checkbox, Toast, Badge } from 'antd-mobile';

import { COMPLETE, NO_COMPLETE, SUCCESS, DELETE_SUCCESS } from '../../utils/enum.js'
import styles from './index.less'

import Alert from '../../components/Alert/index.js'

const CheckboxItem = Checkbox.CheckboxItem;

@connect(({ thing, loading }) => ({
  thing,
  a: loading.effects['thing/getData'],
}))
class Index extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'thing/getData',
      payload: {
        page: 1,
      }
    })
  }

  // 跳转 - 页面
  toAdd = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/todo/add'))
  }

  // 修改
  inputChange = (item) => {
    const { dispatch } = this.props
    const { complete_status } = item
    const newStatus = complete_status === NO_COMPLETE ? COMPLETE : NO_COMPLETE
    dispatch({
      type: 'thing/changeThing',
      payload: {
        id: item.id,
        complete_status: newStatus,
      },
      callback: res => {
        if (res.error_code === SUCCESS) {
          Toast.success('修改成功', 1)
        } else {
          Toast.info(res.msg, 1)
        }
      }
    })
  }

  // 删除
  delThing = (item) => {
    const { dispatch } = this.props
    dispatch({
      type: 'thing/delThing',
      payload: {
        id: item.id,
      },
      callback: res => {
        // error_code === 1 表示删除成功
        if (res.error_code === DELETE_SUCCESS) {
          Toast.success('删除成功', 1)
        } else {
          Toast.info(res.msg, 1)
        }
      }
    })
  }

  AlertDom = (item) => (
    Alert({
      content: '确定删除嘛',
      okClick: () => {
        this.delThing(item)
      }
    })
  )

  render() {
    const { thing: { list = [] } } = this.props

    // 未完成
    const no_complete_list = list.filter(x => x.complete_status === NO_COMPLETE)

    // 完成
    const complete_list = list.filter(x => x.complete_status === COMPLETE)

    const ItemDom = (props) => (
      <CheckboxItem onChange={props.onChange} defaultChecked={props.defaultChecked}>
        {props.content}<span className={styles.delText} onClick={props.delThing}>删除</span>
      </CheckboxItem>
    )

    // 未完成 已完成
    const Title = (props) => (
      <div className={styles.header}>
        <h3>{props.title}</h3>
        <Badge text={props.number} />
      </div>
    )

    // todo列表
    const TodoList = (props) => {
      const {list=[], select=false} = props
      return (
        <List>
          {list.length > 0 ? list.map(item => (
              <ItemDom key={item.id} {...item}
                defaultChecked={select}
                onChange={() => this.inputChange(item)}
                delThing={() => this.AlertDom(item)}
              />
            )) : null}
        </List>
      )
    }

    return (
      <div>
        <h1 className={styles.title}>所有的todolist</h1>
        <Title title="未完成" number={String(no_complete_list.length)} />
        <TodoList list={no_complete_list} />

        <WhiteSpace size="xl" />

        <Title title="已完成" number={String(complete_list.length)} />
        <TodoList list={complete_list} select={true} />

        <WingBlank>
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <Button type="primary" onClick={this.toAdd}>添加新的任务</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Index