import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import BasicLayout from '@components/Layout/Basic'
import RouteRender from '@components/RouteRender'
import { businessRoutes } from '@routes'

@observer
class App extends Component {
  @observable
  siderStatus = false;

  @observable
  currentPath = '';

  componentDidMount() {
    this.init()
  }

  componentDidUpdate() {
    this.init()
  }

  @action
  init = () => {
    const { location } = this.props
    const { pathname, search } = location

    this.currentPath = pathname.concat(search)
  };

  @action
  handleToggleSider = () => {
    this.siderStatus = !this.siderStatus
  };

  @action
  handleMenuItemClick = ({ key }) => {
    const { history, location } = this.props
    const { pathname } = location

    let menuLink = key

    if (menuLink.indexOf('?') !== -1) {
      const [link] = key.split('?')
      menuLink = link
    }

    if (menuLink === pathname) return

    this.currentPath = key

    history.push(key)
  };

  render() {
    return (
      <BasicLayout
        path={ this.currentPath }
        siderStatus={ this.siderStatus }
        onToggleSider={ this.handleToggleSider }
        onMenuItemClick={ this.handleMenuItemClick }
      >
        <RouteRender routes={ businessRoutes } />
      </BasicLayout>
    )
  }
}

export default App
