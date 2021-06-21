/* eslint-disable */
import { DesktopOutlined, MobileOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import React from "react";
import { socket } from "../../Handlers/socket";
import ReCaptcha from "../Recaptcha/reCaptcha";
import "./UsernameSelector.scss";

export interface IUsernameSelectorProps {
  successCallback: Function;
}

export interface IUsernameSelectorState {
  loading: boolean;
  username: string;
  token:string;
  gtoken: string;
  device: string;
}
class UsernameSelector extends React.Component<
  IUsernameSelectorProps,
  IUsernameSelectorState
> {
  static defaultProps = {};
  state: IUsernameSelectorState = {
    loading: true,
    username:"",
    token:"",
    gtoken: "",
    device: "desktop"
  };
  join = async (event:any)=>{
    event?.preventDefault();
    var gtoken = await window.grecaptcha.execute({ action: "test" });
    socket.emit('join', {username: this.state.username, token: this.state.token, gToken: gtoken, device: this.state.device});
  }
  updateUsername = (e:any)=>{
    this.setState({
      username: e.target.value
    })
  }
  async componentDidMount () {
   
    socket.emit('beforejoin');
    socket.on('csrf-token',(token:string) => {
      if (token !== null && token !== undefined){
        this.setState({
          token: token
        });
      }
    });
    socket.on('joined',(session:any) => {
      this.props.successCallback(session, 2);
    });
  }
  render() {
    const {username} = this.state;
    return (
      <>
            <h1 className={"us-h1"}>Pick a Username!</h1>
            <form>
                <ReCaptcha action="test">
                  {captcha => (<></>)}
                </ReCaptcha>
                <Radio.Group style={{margin:"0 auto", display: "table", marginBottom:14, backgroundColor:"#FFF6AC"}} value={this.state.device} onChange={(e) =>{this.setState({device: e.target.value})}}>
                  <Radio.Button  value="desktop"><DesktopOutlined style={{width:"40px", backgroundColor:"#FFF6AC"}}/></Radio.Button>
                  <Radio.Button value="mobile"><MobileOutlined style={{width:"40px", backgroundColor:"#FFF6AC"}}/></Radio.Button>
                </Radio.Group>
                
                <input value={username} onChange={(e) => this.updateUsername(e)} className={"username-input"}/>
                <button disabled={username.length < 2} onClick={(e) => this.join(e)} id="login-button">Join!</button>
                <p className={"username-notice"}>Notice: by using sokpup.io, you agree to allow us to identify your device for session tracking for this site only. This site is protected by Google ReCaptcha.</p>
            </form>
      </>
    );
  }
}

export default UsernameSelector;
