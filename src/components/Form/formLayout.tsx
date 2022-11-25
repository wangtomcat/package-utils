import React from 'react'
import { Form } from 'antd'
import Validator from './validator'

const FormItem = Form.Item

interface p {
  children: any;
  message?: string;
  config?: {
    layout?: Array<number>;
    validator?: Validator;
    label?: React.ReactNode;
    isRequired?: boolean;
    vertical?: boolean;
    description?: React.ReactNode | string;
    style?: { [key: string]: any };
    labelAlign?: "left" | "right";
    colSpan?: number;
    tooltips?: React.ReactNode;
  }
}

export default class FormLayout extends React.Component<p>{
  render() {
    const { children, message, config = {} } = this.props
    const defaultLayout = [8, 14]
    const layout = (config?.layout) || defaultLayout
    const validateStatus = message ? "error" : undefined
    const labelAlign = config?.labelAlign || "right"

    // 判断条件的优先级
    const required = config.isRequired === undefined ? Boolean(config.validator) ? Boolean(config.validator) && config.label != undefined : Boolean(config.isRequired) : Boolean(config.isRequired)

    const label = config === undefined || config.label === undefined ? " " : config.label

    // 布局
    const gridLayout = layout[0] === 0 || config.vertical ? {} : { labelCol: { span: layout[0] }, wrapperCol: { span: layout[1] } }

    const styles = { ...(config?.style || {}) }

    return <FormItem
      {...gridLayout}
      label={label}
      validateStatus={validateStatus}
      required={required}
      help={message || config.description}
      labelAlign={labelAlign}
      style={{ ...styles }}
    >
      {children}
      {config.tooltips ? config.tooltips : null}
    </FormItem>
  }
}