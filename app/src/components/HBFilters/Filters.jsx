import React, { Component } from 'react'
import { Form, Row, Col, Input } from 'antd'

const { Search } = Input

@Form.create()
class HBFilters extends Component {
  handleSearch = () => {
    const { form, onSearch } = this.props
    const { validateFields } = form

    validateFields(onSearch)
  }

  handleReset = () => {
    const { form, onReset } = this.props
    const { resetFields } = form

    resetFields()
    onReset()
  }

  renderComponent = (type, placeholder) => {
    let resultComponent

    switch (type) {
      case 'input':
        resultComponent = <Input placeholder={ placeholder } />
        break
      case 'search':
        resultComponent = (
          <Search
            placeholder={ placeholder }
            onSearch={ this.handleSearch }
            enterButton
            allowClear
          />
        )
        break
      default:
        break
    }

    return resultComponent
  }

  renderFilterItem = item => {
    const { form } = this.props
    const { getFieldDecorator } = form
    const { label, field, type, value, rules, placeholder } = item

    const options = {
      initialValue: value,
      rules,
    }

    return (
      <Col span={ 24 } key={ label }>
        <Form.Item>
          {getFieldDecorator(field, options)(
            this.renderComponent(type, placeholder)
          )}
        </Form.Item>
      </Col>
    )
  }

  renderFilterBody = () => {
    const { data } = this.props

    return data.map(this.renderFilterItem)
  }

  render() {
    // const { data } = this.props

    return (
      <Form className='filters-wrapper'>
        <Row gutter={ 24 }>
          {this.renderFilterBody()}
          {/* <Col
            offset={ data.length === 1 ? 8 : 0 }
            span={ 8 }
            style={{ textAlign: 'right' }}
          >
            <Form.Item>
              <Button type='primary' onClick={ this.handleSearch }>
                搜索
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={ this.handleReset }>
                重置
              </Button>
            </Form.Item>
          </Col> */}
        </Row>
      </Form>
    )
  }
}

export default HBFilters
