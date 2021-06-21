import React from "react"
declare global {
    interface Window {
      captchaOnLoad: () => void
      grecaptcha: ReCaptchaInstance
    }
  }
interface ReCaptchaInstance {
    ready: (cb: () => any) => any
    execute: (options: ReCaptchaExecuteOptions) => Promise<string>
    render: (id: string, options: ReCaptchaRenderOptions) => any
  }
  
  interface ReCaptchaExecuteOptions {
    action: string
  }
  
  interface ReCaptchaRenderOptions {
    sitekey: string
    size: 'invisible'
  }
  
  interface Props {
    action: string
    children: (props: CaptchaProps) => React.ReactNode
  }
  
  interface CaptchaProps {
    isReady: boolean
    execute: () => Promise<string>
  }
  
  interface State {
    readonly isReady: boolean
  }
  
  export default class ReCaptcha extends React.PureComponent<Props, State> {
    state: State = {
      isReady: false
    }
  
    private script!: HTMLScriptElement
    private widget!: HTMLDivElement
  
    componentDidMount(): void {
      this.loadScript()
    }
  
    componentWillUnmount(): void {
      document.body.removeChild(this.widget)
      document.body.removeChild(this.script)
    }
  
    render(): React.ReactNode {
      return this.props.children({
        isReady: this.state.isReady,
        execute: this.executeCaptcha
      })
    }
  
    private loadScript = (): void => {
      window.captchaOnLoad = this.onLoad
  
      const url = 'https://www.google.com/recaptcha/api.js'
      const queryString = '?onload=captchaOnLoad&render=explicit'
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = url + queryString
      script.async = true
      script.defer = true
  
      this.script = document.body.appendChild(script)
    }
  
    private onLoad = (): void => {
      const widget = document.createElement('div')
      widget.id = 'g-recaptcha'
      this.widget = document.body.appendChild(widget)
  
      window.grecaptcha.render('g-recaptcha', {
        sitekey: '6LcTzDobAAAAADtrSdLTbc6yA4pfNmkFAIXuSjuu',
        size: 'invisible'
      })
  
      window.grecaptcha.ready(() => {
        this.setState({ isReady: true })
      })
    }
  
    private executeCaptcha = (): Promise<string> => {
      if (!this.state.isReady) {
        throw new Error("Captcha can be executed only when it's ready.")
      }
  
      return window.grecaptcha.execute({ action: this.props.action })
    }
  }
  

  
  