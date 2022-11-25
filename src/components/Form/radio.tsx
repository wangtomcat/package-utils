import React from 'react'
import { Radio } from 'antd'
import FormBase from './base'
import FormLayout from './formLayout'
import Validator from './validator'

const RadioGroup = Radio.Group

interface IOption {
  label: React.ReactNode;
  value: string | number | boolean;
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

export default class FormRadio extends FormBase {
  handleChange(val: any) {
    const { data = {} } = this.props
    const { onChange } = data as IConfig
    this.validate(val?.target?.value)
    this.setState({ value: val?.target?.value })
    if (onChange) {
      onChange(val?.target?.value)
    }
  }

  render() {
    const { data = {} } = this.props
    const { options = [], disabled = false, defaultValue } = data
    const { message, value = defaultValue } = this.state
    return <FormLayout config={data} message={message}>
      <RadioGroup
        disabled={disabled}
        value={value}
        onChange={(val: any) => this.handleChange(val)}
      >
        {
          Array.isArray(options) && options.map((item, index) => {
            const { label, value, disabled } = item
            return <Radio value={value} key={index} disabled={disabled}>
              {label}
            </Radio>
          })
        }
      </RadioGroup>
    </FormLayout>
  }
}