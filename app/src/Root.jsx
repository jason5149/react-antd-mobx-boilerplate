import React, { PureComponent } from 'react'
import { Provider } from 'mobx-react'
import { HashRouter as Router } from 'react-router-dom'
import { ErrorBoundary } from 'react-utils-components'
import BlankLayout from '@components/Layout/Blank'
import RouteRender from '@components/RouteRender'
import stores from '@models'
import { baseRoutes } from '@routes'

class Root extends PureComponent {
  renderRouter() {
    return (
      <Router>
        <BlankLayout>
          <RouteRender routes={ baseRoutes } />
        </BlankLayout>
      </Router>
    )
  }

  render() {
    return (
      <ErrorBoundary>
        <Provider { ...stores }>{this.renderRouter()}</Provider>
      </ErrorBoundary>
    )
  }
}

export default Root
