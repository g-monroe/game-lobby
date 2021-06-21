/* eslint-disable */
import React from 'react';
import './Home.scss';
import NavBar from '../../Components/Navbar/Navbar';
import { IGoalHandler, GoalHanlder } from '../../Handlers/GoalHandler';
import FrostedCard from '../../Components/FrostedCard/FrostedCard';
import AvatarSelector from '../../Components/AvatarSelector/AvatarSelector';
import UsernameSelector from '../../Components/UsernameSelector/UsernameSelector';
import { message } from 'antd';
import 'antd/dist/antd.css';
import { socket } from '../../Handlers/socket';
import Start from '../../Components/Start/Start';
import logo from '../../assets/img/logo.jpg';
import Lobby from '../../Components/Lobby/Lobby';
import AwaitHost from '../../Components/AwaitHost/AwaitHost';
interface IHomeProps{
  goalHandler?: IGoalHandler;
}
interface IHomeState{
  loading: boolean;
  step:number;
  className: string;
  session?: any;
  room?: any;
}
class Home extends React.Component<IHomeProps, IHomeState> {
  static defaultProps = {
    goalHandler: new GoalHanlder()
  }
  state: IHomeState = {
    loading: false,
    step: 1,
    className: "shortcard"
  }
  err = (msg:string) =>{
    message.error(msg);
  }
  async componentDidMount() {
    socket.on('exception', (msg:any) => {
      console.log(msg);
      this.err(msg.errorMessage);
    })
  }
  createdHost = (session:any, room:any, step:number) =>{
    console.log("Success:", session);
    console.log("New Room:", room);
    this.setState({
      step:step,
      room: room,
      session: session,
      className: "longcard"
    })
  }
  waitingForHost = (data:any, step:number) =>{
    console.log("Waiting:", data);
    this.setState({
      step:step,
      session: data.session,
      className: "longcard"
    })
  }
  changeStep = (session:any, step: number) =>{
    console.log("Success:", session);
    this.setState({
      step:step,
      session: session,
      className: "longcard"
    })
  }
  renderStep = () =>{
    if (this.state.step ===1){
      return (this.renderForm());
    }else if (this.state.step ===2){
      return (this.renderCard());
    }else if (this.state.step ===3){
      return (this.renderStart());
    }else if (this.state.step ===4){
      return (this.renderLobby());
    }else if (this.state.step ===5){
      return (this.renderAwaitHost());
    }
  }
  renderCard = () =>{
    return(<AvatarSelector successCallback={this.changeStep} user={this.state.session}/>);
  }
  renderStart = () =>{
    return(<Start waitingCallback={this.waitingForHost} successCallback={this.createdHost} user={this.state.session}/>);
  }
  renderForm = () => {
    return(<UsernameSelector successCallback={this.changeStep} />);
  }
  renderLobby = () => {
    return(<Lobby successCallback={this.changeStep} room={this.state.room} user={this.state.session}/>);
  }
  renderAwaitHost = () => {
    return(<AwaitHost failedCallback={this.changeStep} successCallback={this.createdHost} user={this.state.session}/>);
  }
  render() {
    if (this.state.loading){
      return (
        <div className="App">
          <NavBar></NavBar>
        </div>
      );
    }else{
      return (
        <>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        <div className="App">
          <NavBar></NavBar>
          <FrostedCard className={this.state.className} renderContent={this.renderStep}/>
        </div>
        <div className="ribbon">
          <span className="ribbon3"><img style={{width: "100%"}} src={logo}/></span>
        </div>
        </>
      );
    }
  }
}

export default Home;
