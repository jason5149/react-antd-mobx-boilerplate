import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ContainerWrapper extends Component {
  render() {
    const { children } = this.props

    return (
      <div className='container-wrapper'>
        {children}
      </div>
    )
  }
}

ContainerWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
}

ContainerWrapper.defaultProps = {
  children: undefined,
}

export default ContainerWrapper
