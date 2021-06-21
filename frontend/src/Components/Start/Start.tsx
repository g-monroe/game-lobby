/* eslint-disable */
import { message } from "antd";
import { withSuccess } from "antd/lib/modal/confirm";
import React from "react";
import { socket } from "../../Handlers/socket";
import "./Start.scss";

export interface IStartProps {
    user:any;
    successCallback:Function;
    waitingCallback:Function;
}
 
export interface IStartState {
    code: string;
}
class Start extends React.Component<IStartProps, IStartState> {
   
    static defaultProps = {
    };

    state: IStartState = {
        code: ""
    };
    hostGame = () =>{
        socket.emit('hostGame', {session: this.props.user});
    }
    joinGame = () =>{
        socket.emit('findGame', {session: this.props.user, gameCode: this.state.code});
    }
    componentDidMount() {
        socket.on('hostCreated', (data:any) =>{
            this.props.successCallback(data.session, data.room, 4);
        });
        socket.on('askingToJoin', (data:any) =>{
            console.log(data);
           this.props.waitingCallback(data, 5);
        });
    }
    updateCode = (e:any)=>{
        this.setState({
          code: e.target.value
        })
      }
    render() { 
        return (
            <>
            <div>
              <h1 className={'us-h1'}>Join or Host</h1>
              <p className={'subtitle'}>Xploding Dogs is the Game.</p>
              <input value={this.state.code} onChange={(e) => this.updateCode(e)} className={"code-input"}/>
              <button onClick={() => {this.joinGame();}} className={"odd"}>Join</button><button onClick={() => {this.hostGame();}}>Host</button>
            </div>
            </>
        );
        
    };
}
 
export default Start;