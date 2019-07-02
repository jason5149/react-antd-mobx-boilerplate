import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch } from 'react-router-dom'

class RouteRender extends Component {
  renderRouteRedirect(path) {
    return <Redirect to={ path } />
  }

  renderFuncRoute({ path, exact, redirect }) {
    return (
      <Route
        key={ path }
        exact={ exact }
        path={ path }
        render={ () => this.renderRouteRedirect(redirect) }
      />
    )
  }

  renderCompRoute({ path, exact, component }) {
    return (
      <Route
        key={ path }
        exact={ exact }
        path={ path }
        component={ component }
      />
    )
  }

  render() {
    const { routes } = this.props

    return (
      <Switch>
        {routes.map(route => {
          const { redirect } = route

          if (redirect) {
            return this.renderFuncRoute(route)
          }
    
          return this.renderCompRoute(route)
        })}
      </Switch>
    )
  }
}

RouteRender.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default RouteRender