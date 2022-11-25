import React from 'react'
import { Checkbox } from 'antd'
import FormLayout from './formLayout'
import FormBase from './base'
import Validator from './validator'

interface IOption {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
}

interface IConfig {
  name: string; //表单名 数据的key
  value: any; // 表单值 数据的value
  type?: string; // 表单类型
  label?: string;
  message?: string; // 错误信息
  layout?: Array<number>; // 布局
  description?: string; // 字段的描述
  validator?: Validator; // 校验规则
  disabled?: boolean; // 是否禁用
  options?: IOption;
  onChange?: Function;
}

export default class FormCheckBox extends FormBase {
  handleChange(val: any) {
    const { data = {} } = this.props
    const { onChange } = data as IConfig;
    this.validate(val)
    this.setState({ value: val })
    if (onChange) {
      onChange(val)
    }
  }

  render() {
    const { data = {} } = this.props
    const { message, value = [] } = this.state
    const { options = [], optionList = [], disabled } = data

    const list = Array.isArray(options) ? options : Array.isArray(optionList) ? optionList : []

    return <FormLayout config={data} message={message}>
      <Checkbox.Group disabled={disabled} value={Array.isArray(value) ? value : value.split(",")} onChange={(val: any) => this.handleChange(val)}>
        {
          list.map(item => {
            let one: any = item
            if (typeof item === "string" || typeof item === "number") {
              one = { label: item, value: item }
            }
            const { label, value, disabled } = one
            return <Checkbox value={value} key={value} disabled={disabled}>
              {label}
            </Checkbox>
          })
        }
      </Checkbox.Group>
    </FormLayout>
  }

}