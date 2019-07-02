import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

class Basic extends Component {
  renderSider() {
    const { path, siderStatus, onMenuItemClick } = this.props

    return (
      <Sider
        className='layout-sider fix-side-bar'
        width={ 200 }
        trigger={ null }
        collapsible
        collapsed={ siderStatus }
      >
        <div className='logo' />
        <Menu
          theme='dark'
          mode='inline'
          defaultOpenKeys={ ['/app/project'] }
          selectedKeys={ [path] }
          onClick={ onMenuItemClick }
        >
          <SubMenu
            key='/app/project'
            title={ (
              <span>
                <Icon type='project' />
                <span>项目管理</span>
              </span>
) }
          >
            <Menu.Item key='/app/project/list'>项目列表</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }

  renderHeader() {
    const { siderStatus, onToggleSider } = this.props

    return (
      <Header
        className='fix-header'
        style={{ width: `calc(100% - ${ siderStatus ? '80px' : '200px' })` }}
      >
        <div className='layout-header'>
          <span className='trigger'>
            <Icon
              type={ siderStatus ? 'menu-unfold' : 'menu-fold' }
              onClick={ onToggleSider }
            />
          </span>
          <div className='layout-header-right'>
            <span>Hello! Admin</span>
          </div>
        </div>
      </Header>
    )
  }

  renderContent() {
    const { children } = this.props

    return <Content className='layout-content'>{children}</Content>
  }

  render() {
    return (
      <div className='basic-layout'>
        <Layout>
          {this.renderSider()}
          <Layout style={{ minHeight: '100vh' }}>
            {this.renderHeader()}
            {this.renderContent()}
          </Layout>
        </Layout>
      </div>
    )
  }
}

Basic.propTypes = {
  path:            PropTypes.string,
  siderStatus:     PropTypes.bool,
  onMenuItemClick: PropTypes.func,
  onToggleSider:   PropTypes.func,
  children:        PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
}

Basic.defaultProps = {
  path:            '',
  siderStatus:     false,
  onMenuItemClick: () => {},
  onToggleSider:   () => {},
  children:        undefined,
}

export default Basic
