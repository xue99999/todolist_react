import React, { Component } from 'react'
import BaseLayout from './basicLayout'
import DocumentTitle from 'react-document-title'

const ULR_NO_LAYOUT = ['/todo', '/my'];

class Index extends Component {

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

  renderBody = () => {
    const {location: {pathname}} = this.props
    if (ULR_NO_LAYOUT.includes(pathname)) {
      return  (<BaseLayout {...this.props} />)
    }

    return this.props.children
  }

  render() {
    return (
      <DocumentTitle title={this._getTitle()}>
        {this.renderBody()}
      </DocumentTitle>
    )
  }
}

export default Index
