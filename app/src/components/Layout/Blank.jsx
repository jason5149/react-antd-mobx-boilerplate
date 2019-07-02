import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'

class Blank extends Component {
  render() {
    const { children } = this.props

    return (
      <Switch>
        {children}
      </Switch>
    )
  }
}

Blank.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
}

export default Blank
