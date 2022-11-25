import React from 'react'
import { Input } from 'antd'
import FormBase from './base'
import FormLayout from './formLayout'
import Validator from './validator'

const Textarea = Input.TextArea

type IType = "input" | "number" | "password" | "textarea"

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
  maxLength?: number; // 最大长度
  showCount?: boolean; // 是否展示长度数字
  disabled?: boolean; // 是否禁用
  defaultValue?: any; // 默认值
  autoSize?: boolean; // 自适应高度（textarea）
  addonAfter?: React.ReactNode; // 后置标签
  addonBefore?: React.ReactNode; // 前置标签
  prefix?: React.ReactNode; // 前缀
  suffix?: React.ReactNode; // 后缀
  rows?: number, // 文本域行数
  onChange?: Function;
}

export default class FormInput extends FormBase {
  onInputChange(val: any) {
    // val.persist();
    const { value: oldValue } = this.state
    const { data } = this.props
    const { onChange } = data
    const type = data?.type || 'input'

    // 对number类型的进行特殊处理
    if (type === "number" && isNaN(Number(val?.target?.value))) {
      this.validate(oldValue)
      this.setState({ value: oldValue })
      return
    }

    this.validate(val?.target?.value)
    this.setState({ value: val?.target?.value })

    if (onChange) {
      onChange(val?.target?.value)
    }
  }


  // 失去焦点去除空格
  onBlur() {
    const { data } = this.props
    const { onChange } = data
    const { value: oldValue } = this.state

    const newValue = typeof oldValue === "string" ? oldValue.trim() : oldValue

    if (newValue === oldValue) {
      return
    }

    this.validate(newValue)
    this.setState({ value: newValue })

    if (onChange) {
      onChange(newValue)
    }
  }

  render() {
    const { data } = this.props
    const { message, value } = this.state
    const defaultConfig: IConfig = {
      name: "",
      value: ""
    }

    const config = data || defaultConfig
    const type = data?.type || "input"
    const newType = data?.formItemTypeEnum?.toLowerCase()

    // 通用的props
    const itemProps = {
      value,
      onChange: (v: any) => this.onInputChange(v),
      onBlur: () => this.onBlur(),
      placeholder: config?.placeholder,
      maxLength: config?.maxLength,
      showCount: config?.showCount,
      disabled: config?.disabled,
      defaultValue: config?.defaultValue,
      autoSize: config.autoSize,
      addonAfter: config.addonAfter,
      addonBefore: config?.addonBefore,
      prefix: config?.prefix,
      suffix: config?.suffix,
      rows: config?.rows,
      className: config?.className
    }

    const typeSwitcher = {
      "input": () => <Input {...itemProps} />,
      "password": () => <Input.Password {...itemProps} />,
      "number": () => <Input {...itemProps} />,
      "textarea": () => <Textarea {...itemProps} />,
    }


    return <FormLayout config={config} message={message}>
      {typeSwitcher[type as IType] ? typeSwitcher[type as IType]() : null}
      {typeSwitcher[newType as IType] ? typeSwitcher[newType as IType]() : null}
    </FormLayout>
  }

}