import React, { PureComponent } from 'react'
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

class BasicLayout extends PureComponent {

  _getSelect = (url) => {
    const { location: {pathname=''} } = this.props
    return url === pathname
  }

  render() {
    return (
        <div className={styles.baseLayout}>
        
          <TabBar
            unselectedTintColor="#333"
            barTintColor="white"
            tabBarPosition='bottom'
          >
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
                  {/* 把需要底部导航页面的样式直接在这里设置好，到了页面就不用动了，哈哈 */}
                    {
                      selected?
                      (<div className={styles.child_wrap}>{this.props.children}</div>):null
                    }
                  </TabBar.Item>)
              })
            }
          </TabBar>
        </div>
    )
  }
}

export default BasicLayout
