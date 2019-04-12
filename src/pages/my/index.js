import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {List, Button, WhiteSpace, WingBlank } from 'antd-mobile';

import styles from './index.less';


@connect(({login, my, loading}) => ({
  login,
  my, 
  loading: loading.effects['my/getUserInfo'],
}))
class My extends PureComponent {
  
  componentDidMount() {
    this.getUser()
  }

  getUser = () => {
    const {dispatch} = this.props;
    dispatch({
        type: 'my/getUserInfo',
    })
  }

  logout = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'login/logout',
    })
  }

  render() {
    const {
      my: {
        userInfo: {
          nickname='',
          email='',
        }
      },
    } = this.props
    

    return (
      <div>
        <h1 className={styles.title}>我的</h1>
        
        <List className="my-list">
            <List.Item extra={nickname}>用户名</List.Item>
            <List.Item extra={email}>邮箱号</List.Item>
        </List>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WingBlank>
            <Button type="primary" onClick={this.logout}>注销</Button>
        </WingBlank>
      </div>
    )
  }
}

export default My