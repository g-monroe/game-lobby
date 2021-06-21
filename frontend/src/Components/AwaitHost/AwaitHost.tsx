/* eslint-disable */
import { message } from "antd";
import { withSuccess } from "antd/lib/modal/confirm";
import React from "react";
import { socket, startTime } from "../../Handlers/socket";
import "./AwaitHost.scss";

export interface IAwaitHostProps {
    user:any;
    successCallback:Function;
    failedCallback:Function;
}
 
export interface IAwaitHostState {
    code: string;
    startTimer: boolean;
    time: number;
}
class AwaitHost extends React.Component<IAwaitHostProps, IAwaitHostState> {
   
    static defaultProps = {
    };
    countDown =  (()=>{
        const interval = setInterval(async () => {
            if (this.state.time !== 0){
                this.setState({
                    time: this.state.time -1,
                })
            }else{
                if (this.state.startTimer){
                    socket.emit('joinTimeOut', {session: this.props.user});
                    this.setState({
                        startTimer: false,
                    })
                }
            }
        }, 960);
        return  () => clearInterval(interval);
      })();
    state: IAwaitHostState = {
        code: "",
        startTimer: true,
        time: 29
    };
    componentDidMount() {
        socket.on('failedJoin', (data:any) => {
            this.props.failedCallback(data, 3);
        });
        socket.on('acceptedJoin', (data:any) => {
            console.log(data);
            if (data.gameId !== undefined){
                socket.emit('joinLobby', {session:this.props.user, gameId: data.gameId});
            }
        });
        socket.on('joinedLobby', (data:any)=>{
            this.props.successCallback(data.session, data.room, 4);
        });
        socket.on('deniedJoin', (data:any)=>{
            this.props.failedCallback(data.session, 3);
        });
    }
    render() { 
        return (
            <>
            <div>
              <h1 className={'us-h1'}>Asking to Join.</h1>
              <h1 className={'us-h1'}>{this.state.time}</h1>
              <div className="loader loader--style1" title="0">
                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="140px" height="140px" viewBox="0 0 40 40" enable-background="new 0 0 40 40">
                <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                    C22.32,8.481,24.301,9.057,26.013,10.047z">
                    <animateTransform attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 20 20"
                    to="360 20 20"
                    dur="0.5s"
                    repeatCount="indefinite"/>
                    </path>
                </svg>
                </div>
            </div>
            </>
        );
        
    };
}
 
export default AwaitHost;