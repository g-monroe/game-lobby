/* eslint-disable */
import React from "react";
import { AnimalAvatar } from "../../assets/avatars/Avatars";
import { socket } from "../../Handlers/socket";
import Avatar, { bounceRnd } from "../Avatar/Avatar";
import  "./AvatarSelector.scss";

export interface IAvatarSelectorProps {
    user:any;
    successCallback:Function;
}
 
export interface IAvatarSelectorState {

}
 const pack = 'animals';
class AvatarSelector extends React.Component<IAvatarSelectorProps, IAvatarSelectorState> {
   
    static defaultProps = {
    };
    selectedAvatar = (type: string, name:"") => {
        console.log("selected:", type, name);
        socket.emit('avatarPicked', {session: this.props.user, avatar: {pack:type, name: name}});
    }
    componentDidMount(){
        socket.on('avatarSaved',  (session:any)=> {
            this.props.successCallback(session, 3);
        });
    }
    state: IAvatarSelectorState = {
    };
    render() { 
        let avatars = new AnimalAvatar;
        return (
            <>
                <h1 className={"as-h1"}>{this.props.user.username}, choose an Avatar!</h1>
                <div className="flex-grid">
                    <div className="flex-grid-item"><Avatar type={pack} name={'bat'} onClick={this.selectedAvatar} customName={bounceRnd()} color={"#FA821A"} imgClassName={"as-img"} AvatarType={avatars.bat}/></div>
                    <div className="flex-grid-item"><Avatar type={pack} name={'bear'} onClick={this.selectedAvatar} customName={bounceRnd()} color={"#97005B"} imgClassName={"as-img"} AvatarType={avatars.bear}/></div>
                    <div className="flex-grid-item"><Avatar type={pack} name={'fox'} onClick={this.selectedAvatar} customName={bounceRnd()} color={"#3C956D"} imgClassName={"as-img"} AvatarType={avatars.fox}/></div>
                    <div className="flex-grid-item"><Avatar type={pack} name={'giraffe'} onClick={this.selectedAvatar} customName={bounceRnd()} color={"#2ABA3A"} imgClassName={"as-img"} AvatarType={avatars.giraffe}/></div>
                    <div className="flex-grid-item"><Avatar type={pack} name={'gorilla'} onClick={this.selectedAvatar} customName={bounceRnd()} color={"#7AD2F4"} imgClassName={"as-img"} AvatarType={avatars.gorilla}/></div>
                    <div className="flex-grid-item"><Avatar type={pack} name={'parrot'} onClick={this.selectedAvatar} customName={bounceRnd()} color={"#38C7C7"} imgClassName={"as-img"} AvatarType={avatars.parrot}/></div>
                    <div className="flex-grid-item"><Avatar type={pack} name={'penguin'} onClick={this.selectedAvatar} customName={bounceRnd()} color={"#EDCD00"} imgClassName={"as-img"} AvatarType={avatars.penguin}/></div>
                    <div className="flex-grid-item"><Avatar type={pack} name={'pufferfish'} onClick={this.selectedAvatar} customName={bounceRnd()} color={"#3C956D"} imgClassName={"as-img"} AvatarType={avatars.pufferfish}/></div>
                    <div className="flex-grid-item"><Avatar type={pack} name={'zebra'} onClick={this.selectedAvatar} customName={bounceRnd()} color={"#001E3E"} imgClassName={"as-img"} AvatarType={avatars.zebra}/></div>
                </div>
            </>
        );
        
    };
}
 
export default AvatarSelector;