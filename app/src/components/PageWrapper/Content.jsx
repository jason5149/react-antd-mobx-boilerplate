import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ContentWrapper extends Component {
  render() {
    const { children } = this.props

    return (
      <div className='page-wrapper content-wrapper'>
        {children}
      </div>
    )
  }
}

ContentWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
}

ContentWrapper.defaultProps = {
  children: undefined,
}

export default ContentWrapper
