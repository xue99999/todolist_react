import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {List, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';

import styles from './index.less';


@connect(({my, loading}) => ({
  my, 
  a: loading.effects['register/register'],
}))
class My extends PureComponent {

  getUser = () => {
      const {dispatch} = this.props;
      dispatch({
          type: 'my/getUserInfo',
          payload: {
              token: '',
          }
      })
  }

  render() {
    return (
      <div>
        <h1 className={styles.title}>我的</h1>
        
        <List className="my-list">
            <List.Item extra={'xue jun'}>用户名</List.Item>
            <List.Item extra={'extra content'}>邮箱号</List.Item>
        </List>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WingBlank>
            <Button type="primary">注销</Button>
        </WingBlank>
      </div>
    )
  }
}

export default My