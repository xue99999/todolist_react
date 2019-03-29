import React, { Component } from 'react'
import { routerRedux } from 'dva/router'
import { TabBar } from 'antd-mobile'
import DocumentTitle from 'react-document-title'

import styles from './index.css'

const menu = [{
  title: "首页",
  key: "首页",
  path: '/todo',
  isSelect: true,
}, {
  title: "新增",
  key: "新增",
  path: '/todo/add',
  isSelect: false,
}]

class BasicLayout extends Component {
  state = {
    menu,
  }

  componentDidMount() {
    this._setSelect(this.props)
  }

  renderContent = item => (
    <div>
      {this.props.children}
    </div>
  )

  // 监听路由, 设置当前tab选中项
  _setSelect = (props) => {
    const {
      location: {pathname=''}
    } = props

    menu.forEach(item => {
      if (item.path === pathname) {
        item.isSelect = true
      } else {
        item.isSelect = false
      }
    })

    this.setState({
      menu,
    })
  }

  // 获取title
  _getTitle = () => {
    const {
      location: {pathname=''},
      route: {routes=[]}
    } = this.props

    let title = ''

    routes.forEach(item => {
      if (item.path === pathname) {
        title = item.name
      }
    })

    return title
  }

  handleMenuClick = item => {
    // eslint-disable-next-line
    window.g_app._store.dispatch(routerRedux.push(item.path))
  }


  componentWillReceiveProps(nextProps) {
    console.log(nextProps, '---')
    this._setSelect(nextProps)
  }

  render() {
    const {menu} = this.state

    return (
      <DocumentTitle title={this._getTitle()}>
        <div className={styles.normal}>
          <TabBar>
            {
              menu.map(item => (
                <TabBar.Item
                  title={item.title}
                  key={item.key}
                  icon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                  }}
                  />
                  }
                  selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                  }}
                  />
                  }
                  selected={item.isSelect}
                  onPress={() => { this.handleMenuClick(item) }}
                >
                  {this.renderContent()}
                </TabBar.Item>
              ))
            }

          </TabBar>
        </div>
      </DocumentTitle>
    )
  }
}

export default BasicLayout;
