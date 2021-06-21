import React from 'react';
import { io } from 'socket.io-client';

const URL = 'http://192.168.1.249:3030';
export const socket = io(URL, { autoConnect: true, transports: ['websocket'] });
export let ponged = true;
export let timeoutCount = 0;
export let serverLatency = 0;
export let startTime = Date.now()
export const serverPing =  (()=>{
    const interval = setInterval(async () => {
      if (ponged){
        ponged = false;
        timeoutCount = 0;
        await socket.emit('ping');
        startTime = Date.now();
      }else{
          timeoutCount++;
      }
    }, 5000);
    return  () => clearInterval(interval);
  })();
interface ISocketIOProps{
    pongCallback?: Function;
    pingCallback?: Function;
}
interface ISocketIOState{
    serverLatency: number;
    timeoutCount:number;
    ponged: boolean;
    startTime?: number;
}
export class SocketIO extends React.Component<ISocketIOProps, ISocketIOState>{
    static defaultProps = {
    }
    state: ISocketIOState = {
        serverLatency: 0,
        timeoutCount: 0,
        ponged: true,
    }
    componentDidMount(){
        socket.on('pong', () => {
            serverLatency = Date.now() - startTime
            ponged = true;
            if (this.props.pongCallback !== undefined) {
              this.props.pongCallback(serverLatency.toString() + "ms");
            }
        });
    }

    render(){
        return(
            <>
            </>);
    };
}