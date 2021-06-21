/* eslint-disable */
import React from 'react';
import './Controller.scss';
import 'antd/dist/antd.css';
import PropTypes from "prop-types";
// @ts-ignore
import ReactNipple from "react-nipple";
// @ts-ignore
import DebugView from "react-nipple/lib/DebugView";
import { socket } from '../../Handlers/socket';
interface IControllerProps{
}
interface IControllerState{
  data: any;
  x: number;
  y: number;
  angle: number;
  call: boolean;
}
class Controller extends React.Component<IControllerProps, IControllerState> {
  static propTypes = {
    title: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    options: PropTypes.object
};
  static defaultProps = {
  }

  state: IControllerState = {
    data: undefined,
    x:50,
    y:50,
    angle: 0,
    call: false
  }
  
  handleJoystickStart = (evt: any, data: any) => {
      
      this.setState({ data:data, call:true });
  };
  handleJoystickEnd = (evt: any, data: any) => {
    //console.log(data.direction);
      this.setState({ data:data, call:false });
  };
  componentDidMount (){
    setInterval(() => {
        const {data, x, y } = this.state
        let moveX = x;
        let moveY = y;
        
        if (this.state.call){
            try {
                let f = data.force > 1.5 ? 1.5 : data.force;
                if (data.direction.x ==  "left"){
                    moveX += f * Math.cos(data.angle.degree * Math.PI / 180);
                }else if (data.direction.x == "right"){
                    moveX += f * Math.cos(data.angle.degree * Math.PI / 180);
                }
                if (data.direction.y ==  "up"){
                    moveY -= f* Math.sin(data.angle.degree  * Math.PI / 180);
                }else if (data.direction.y ==  "down"){
                    moveY -= f * Math.sin(data.angle.degree  * Math.PI / 180);
                }
                if (moveY < 0 || moveX < 0 || moveX > 500 || moveY > 500){
                   moveX = 50;
                   moveY = 50;
                }
                this.setState({ x:moveX, y:moveY, angle: data.angle.radian });
                socket.emit('movePlayer', {x:moveX, y:moveY, angle: data.angle.radian});   
            } catch (error) {
                
            }
        }
        
    }, 80);
  }
  handleJoystickMove = (evt: any, data: any) => {
    // console.log(data.direction);
    let moveX = this.state.x;
    let moveY = this.state.y;
    try {
        let f = data.force;
        if (data.direction.x ==  "left"){
            moveX += f * Math.cos(data.angle.degree * Math.PI / 180);
        }else if (data.direction.x == "right"){
            moveX += f* Math.cos(data.angle.degree * Math.PI / 180);
        }
        if (data.direction.y ==  "up"){
            moveY -= f* Math.sin(data.angle.degree  * Math.PI / 180);
        }else if (data.direction.y ==  "down"){
            moveY -= f* Math.sin(data.angle.degree  * Math.PI / 180);
        }
        if (moveY < 0 || moveX < 0 || moveX > 500 || moveY > 500){
            return;
        }
        socket.emit('movePlayer', {x:moveX, y:moveY, angle: data.angle.radian});
        this.setState({ data:data, x:moveX, y:moveY, angle: data.angle.radian});
    } catch (error) {
        
    }
  };
  handleJoystickDir = (evt: any, data: any) => {
      console.log(data.direction);
      this.setState({ data });
  };
  handleJoystickPlain = (evt: any, data: any) => {
      this.setState({ data });
  };
  handleJoystickShown = (evt: any, data: any) => {
      this.setState({ data });
  };
  handleJoystickHidden = (evt: any, data: any) => {
      this.setState({ data });
  };
  handleJoystickPressure = (evt: any, data: any) => {
      console.log(data.direction);
      this.setState({ data });
  };
  render() {
   
      return (
        <div className="NippleExample">
                <h2>Example</h2>
                <ReactNipple
                    className="joystick"
                    options={{ mode: "dynamic", color: "red" }}
                    style={{
                        outline: `1px dashed red`,
                        width: 450,
                        height: 150
                    }}
                    onStart={this.handleJoystickStart}
                    onEnd={this.handleJoystickEnd}
                    onMove={this.handleJoystickMove}
                    onDir={this.handleJoystickDir}
                    onPlain={this.handleJoystickPlain}
                    onShown={this.handleJoystickShown}
                    onHidden={this.handleJoystickHidden}
                    onPressure={this.handleJoystickPressure}
                />
                <DebugView data={this.state.data} />
            </div>
      );
  }
}

export default Controller;
