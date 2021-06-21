/* eslint-disable */
import { message, notification } from "antd";
import React from "react";
import { AnimalAvatar } from "../../assets/avatars/Avatars";
import { socket } from "../../Handlers/socket";
import "./Lobby.scss";
import { SmileOutlined } from '@ant-design/icons';

export interface ILobbyProps {
    user:any;
    room:any;
    successCallback:Function;
}
 
export interface ILobbyState {
    room:any;
}
class Lobby extends React.Component<ILobbyProps, ILobbyState> {
    static defaultProps = {
    };

    state: ILobbyState = {
        room: this.props.room
    };
    acceptJoin = (username: string) =>{
        socket.emit('acceptJoin', {session: this.props.user, gameId: this.state.room.id, gameCode: this.state.room.code, attendee: username});
    }
    denyJoin = (username: string) =>{
        socket.emit('denyJoin', {session: this.props.user, gameId: this.state.room.id, gameCode: this.state.room.code, attendee: username});
    }
    openNotification = (msg:any) => {
        notification.open({
            message: msg + ', wants in!',
            description:<>{msg} wants to join your lobby!<button onClick={() => {this.acceptJoin(msg)}}>Accpet</button><button onClick={() => {this.denyJoin(msg)}}>Deny</button></>,
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            duration: 0,
          });
      };
    info = (msg:any) => {
        message.info({
            content: msg,
            style:{
                marginTop: '10vh',
            }
        }, 30);
        this.openNotification(msg);
    }
    componentDidMount() {
        socket.on('askingHost', (data:any) =>{
            console.log(data);
            this.info(data.username);
        });
        socket.on('userJoining', (data:any) =>{
            console.log(data);
        });
        socket.on('userJoined', (data:any) =>{
            this.setState({
                room:data.room
            })
        });
    }
    render() { 
        let avatars = new AnimalAvatar;
        return (
            <>
            <div>
              <h1 className={'us-h1'}>{(this.props.user.username == this.state.room.host.username) ? "Host" : "Waiting on Host"} - {this.props.room.code}</h1>
              <p className={'subtitle'}>Send Code to Friends, wait for the request here.</p>
              <ul className="user-list">
                  {this.state.room.users.map((user:any) => {
                      return(
                        <li className="user-list__item">
                            <img className="user-list__avatar" src={avatars.processUser(user.pack, user.avatar)}/>
                            <div className="user-list__name">
                                {user.username}
                            </div>
                            <div className="user-list__address">
                                {(user.username == this.state.room.host.username) ? "host" : "player"}
                            </div>
                        </li>
                   );
                  })}
              </ul>
              <button disabled={true} className={"odd"}>Join</button>
            </div>
            </>
        );
        
    };
}
 
export default Lobby;

function processUser(): string | undefined {
    throw new Error("Function not implemented.");
}
