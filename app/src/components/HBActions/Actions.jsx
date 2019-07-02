import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

class HBActions extends Component {
  renderActionItem = item => {
    const { onClick } = this.props
    const { type, text, icon } = item

    return (
      <Button
        key={ text }
        style={{ marginLeft: 8 }}
        type={ type }
        icon={ icon }
        onClick={ () => onClick(item) }
      >
        {text}
      </Button>
    )
  }

  renderActionBody = () => {
    const { data } = this.props

    return data.map(this.renderActionItem)
  }

  render() {
    return <div className='actions-wrapper'>{this.renderActionBody()}</div>
  }
}

HBActions.propTypes = {
  data:    PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
}

HBActions.defaultProps = {
  data:    [],
  onClick: () => {},
}

export default HBActions
