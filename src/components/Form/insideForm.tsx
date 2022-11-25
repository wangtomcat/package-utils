import React from "react"
import FormBase from './base'
import FormLayout from './formLayout'

interface IConfig {
  type?: string;
  label?: string;
  name: string;
  value: any;
  message?: string;
  layout?: Array<number>;
  description?: string;
  render: () => React.ReactNode;
}

export default class InsideForm extends FormBase {
  render() {
    const data: IConfig = this.props.data
    return <FormLayout>
      {data && typeof data.render === "function" && data.render() ? data.render() : ""}
    </FormLayout>
  }
}