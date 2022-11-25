import React from 'react'
import { Select } from 'antd'
import FormLayout from './formLayout'
import FormBase from './base'
import Validator from './validator'

const SelectOption = Select.Option

interface IOption {
  label: React.ReactNode;
  value: string | number;
}

interface IConfig {
  name: string; //表单名 数据的key
  value: any; // 表单值 数据的value
  type?: string; // 表单类型
  label?: string;
  message?: string; // 错误信息
  layout?: Array<number>; // 布局
  description?: string; // 字段的描述
  placeholder?: string;
  validator?: Validator; // 校验规则
  disabled?: boolean; // 是否禁用
  options?: IOption;
  onChange?: Function;
  allowClear?: boolean;
  mode?: "multiple" | "tags" | "single"
}

export default class FormSelect extends FormBase {
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
    const { message, value } = this.state
    const { options = [], optionList = [], disabled, allowClear = false, mode = "single", placeholder = "请选择", className, notFoundContent } = data

    const classList = ["miniform_select_box", className]
    return <FormLayout config={data} message={message}>
      <div className={classList.join(" ")}>
        <Select
          disabled={disabled}
          value={value}
          mode={mode}
          onChange={val => this.handleChange(val)}
          allowClear={allowClear}
          placeholder={placeholder}
          notFoundContent={notFoundContent || "无选项"}
        >
          {
            Array.isArray(options) && options.map((item, index) => {
              const { label, value } = item
              return <SelectOption value={value} key={index}>
                {label}
              </SelectOption>
            })
          }
          {
            Array.isArray(optionList) && optionList.map((item, index) => {
              return <SelectOption value={item} key={index}>
                {item}
              </SelectOption>
            })
          }
        </Select>
      </div>
    </FormLayout>
  }

}