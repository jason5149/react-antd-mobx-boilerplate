import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd'

class HeaderWrapper extends Component {
  renderBreadcrumb() {
    const { navList } = this.props

    return (
      <div className='title'>
        <Breadcrumb>
          {navList.map(navItem => (
            <Breadcrumb.Item key={ navItem }>{navItem}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
    )
  }

  renderTitle() {
    const { title } = this.props

    return title && <div className='body'>{title}</div>
  }

  renderFooter() {
    const { children } = this.props

    return children && <div className='footer'>{children}</div>
  }

  render() {
    return (
      <div className='page-wrapper header-wrapper'>
        {this.renderBreadcrumb()}
        {this.renderTitle()}
        {this.renderFooter()}
      </div>
    )
  }
}

HeaderWrapper.propTypes = {
  title:    PropTypes.string,
  navList:  PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
}

HeaderWrapper.defaultProps = {
  title:    '',
  navList:  [],
  children: undefined,
}


export default HeaderWrapper
