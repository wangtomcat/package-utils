import React from 'react'

export interface IProps {
  data: any
}

interface IState {
  value: any;
  message: any;
  defaultValue: any;
  defaultMessage: any;
  [key: string]: any;
}


export default class FormBase extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)
    const { data } = props
    const defaultValue = data?.value;
    const defaultMessage = data?.message

    this.state = {
      value: defaultValue,
      message: defaultMessage,
      defaultValue,
      defaultMessage
    }
  }

  // render前后的变化
  static getDerivedStateFromProps(nextProps: IProps, state: IState) {
    const { data } = nextProps
    const newState = state
    if (JSON.stringify(state.defaultValue) != JSON.stringify(data.value)) {
      newState.value = data.value
      newState.defaultValue = data.value
    }

    if (state.defaultMessage != data.message) {
      newState.message = data.message;
      newState.defaultMessage = data.message;
    }

    return newState
  }

  setMessage(msg: any) {
    this.setState({
      message: msg
    })
  }

  validate = (val: any) => {
    const { validator } = this.props.data  // 外部传来的校验函数
    if (!validator) {
      return true
    }

    const validateStatus = validator.validate(val)
    const validMsg = validator.getMessage()

    if (!validateStatus) {
      this.setMessage(validMsg)
    } else {
      this.setMessage("")
    }
    return validateStatus
  }

  getData() {
    const { data } = this.props
    const { value } = this.state
    const status = this.validate(value)
    if (!status) {
      return false
    }
    if (data.name || data.paramKey) {
      return { [data.name || data.paramKey]: value }
    }
    return {}
  }

}