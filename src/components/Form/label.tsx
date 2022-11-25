import React from 'react'
import { Checkbox } from 'antd'
import FormLayout from './formLayout'
import FormBase from './base'

interface IConfig {
  name: string; //表单名 数据的key
  value: any; // 表单值 数据的value
  type?: string; // 表单类型
  label?: string;
  message?: string; // 错误信息
  layout?: Array<number>; // 布局
  description?: string; // 字段的描述
  render(value: any): React.ReactNode // 渲染方法
}

export default class FormLabel extends FormBase {

  render() {
    const data: IConfig = this.props.data
    const { message, value = [] } = this.state
    let content = value

    if (data && typeof data.render === "function") {
      content = data.render(value)
    }

    return <FormLayout config={data} message={message}>
      {content}
    </FormLayout>
  }

}