import React from 'react'
import { Form } from 'antd'
import FormInput from './input'
import FormSelect from './select'
import FormRadio from './radio'
import FormCheckBox from './checkBox'
import FormLabel from './label'
import FormUpload from './upload'
import InsideForm from './insideForm'

interface FormModelItem {
  type: string;
  name?: string;
  layout?: Array<number>;
  label?: string;
  vertical?: boolean;
  [key: string]: any;
}

interface IProps {
  applyFormItem?: Array<any>;
  vertical?: boolean;
  inline?: boolean;
  model?: FormModelItem[],
  className?: string;
  style?: { [key: string]: any };
  columns?: string | number;
  responsive?: boolean;
  layout?: FormLayout; // 布局
  [key: string]: any
}

type IType = "input" | "number" | "password" | "textarea"
type FormLayout = 'horizontal' | 'inline' | 'vertical';

export default class MiniForm extends React.Component<IProps>{
  refMap: Map<string, any> = new Map()
  public getData(): | { [key: string]: any } | false {
    let newForm = {}
    let validate = true
    for (let [key, value] of this.refMap) {
      const data = value.getData()
      if (data === false) {
        validate = false
      } else {
        newForm = Object.assign(newForm, data)
      }
    }
    return validate === false ? false : newForm
  }

  render() {
    const {
      model = [],
      applyFormItem,
      vertical,
      inline,
      className,
      children,
      style = {},
      columns,
      responsive = true,
      layout = "horizontal",
    } = this.props
    const classList = ["mini_form_area", className]

    // 可以不需要
    // if(vertical){
    //   classList.push("vertical")
    // }
    // if(columns){
    //   classList.push("columns")
    //   style.columns = columns
    // }

    const typeSwitcher = {
      "input": (item: any, key: any) => <FormInput data={item} key={key} ref={f => { this.refMap.set(key, f) }} />,
      "number": (item: any, key: any) => <FormInput data={item} key={key} ref={f => { this.refMap.set(key, f) }} />,
      "password": (item: any, key: any) => <FormInput data={item} key={key} ref={f => { this.refMap.set(key, f) }} />,
      "textarea": (item: any, key: any) => <FormInput data={item} key={key} ref={f => { this.refMap.set(key, f) }} />,
      "select": (item: any, key: any) => <FormSelect data={item} key={key} ref={f => { this.refMap.set(key, f) }} />,
      "radio": (item: any, key: any) => <FormRadio data={item} key={key} ref={f => { this.refMap.set(key, f) }} />,
      "checkbox": (item: any, key: any) => <FormCheckBox data={item} key={key} ref={f => { this.refMap.set(key, f) }} />,
      "label": (item: any, key: any) => <FormLabel data={item} key={key} ref={f => { this.refMap.set(key, f) }} />,
      "uploadFile": (item: any, key: any) => <FormUpload data={item} key={key} ref={f => { this.refMap.set(key, f) }} />,
      "uploadImg": (item: any, key: any) => <FormUpload data={item} key={key} ref={f => { this.refMap.set(key, f) }} />,
      "insideForm": (item: any, key: any) => <InsideForm data={item} key={key} ref={f => { this.refMap.set(key, f) }} />
    }

    return <Form
      className={classList.join(' ')}
      style={style}
      layout={layout}
    >
      {
        model.map((item, index) => {
          const key = item.type + item.name + index;
          const form = typeSwitcher[item.type as IType]
          return form ? form(item, key) : null
        })
      }
      {children}
    </Form>
  }

}