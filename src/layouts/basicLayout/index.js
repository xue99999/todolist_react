import React, { Component } from 'react'
import router from 'umi/router'
import { TabBar } from 'antd-mobile'

import styles from './index.less'

const tabBarData = [{
  key: "index",
  title: "首页",
  url: '/todo',
}, {
  key: "my",
  title: "我的",
  url: '/my',
}]

class BasicLayout extends Component {

  _getSelect = (url) => {
    const { location: {pathname=''} } = this.props
    return url === pathname
  }

  render() {

    return (
        <div className={styles.baseLayout}>
          <TabBar>
            {
              tabBarData.map(item => {
                  const selected = this._getSelect(item.url)
                  return (<TabBar.Item
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
                    selected={selected}
                    onPress={() => {router.push(item.url)}}
                  >
                    {this.props.children}
                  </TabBar.Item>)
              })
            }

          </TabBar>
        </div>
    )
  }
}

export default BasicLayout
