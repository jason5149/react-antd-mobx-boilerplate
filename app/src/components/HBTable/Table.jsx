import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Pagination } from 'antd'

class Tables extends Component {
  render() {
    const {
      size,
      total,
      rowKey,
      columns,
      pageIndex,
      pageSize,
      dataSource,
      onChange,
      onSizeChange,
    } = this.props

    return (
      <div className='table-wrapper'>
        <Table
          size={ size }
          rowKey={ rowKey }
          columns={ columns }
          bordered
          dataSource={ dataSource }
          pagination={ false }
        />
        <div className='pagination-wrapper'>
          <Pagination
            total={ total }
            current={ pageIndex }
            pageSize={ pageSize }
            onChange={ onChange }
            onShowSizeChange={ onSizeChange }
          />
        </div>
      </div>
    )
  }
}

Tables.propTypes = {
  size:         PropTypes.oneOf(['small', 'default', 'middle']),
  total:        PropTypes.number,
  rowKey:       PropTypes.string,
  pageSize:     PropTypes.number,
  pageIndex:    PropTypes.number,
  dataSource:   PropTypes.arrayOf(PropTypes.object),
  onChange:     PropTypes.func,
  onSizeChange: PropTypes.func,
}

Tables.defaultProps = {
  size:         'default',
  total:        0,
  rowKey:       '',
  pageSize:     10,
  pageIndex:    1,
  dataSource:   [],
  onChange:     () => {},
  onSizeChange: () => {},
}

export default Tables
