/* eslint-disable */
import React from 'react';
import './Test.scss';
import Sketch from "react-p5";
import p5Types from "p5";
import { socket } from '../../Handlers/socket';
interface ITestProps{
}

interface ITestState{
  data: any;
  x: number;
  y: number;
  angle: number;
}
class Test extends React.Component<ITestProps, ITestState> {
  static defaultProps = {
  }
  state: ITestState = {
    data: undefined,
    x: 50,
    y: 50,
    angle: 0
  }
  
	//See annotations in JS for more information
	setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.angleMode('radians');
    p5.rectMode('center');
	};
  componentDidMount (){
    socket.on('userJoined', () =>{
      console.log('connected');
    });
    socket.on('updatePlayer', (data:any) =>{
      console.log("recieved", data);
      this.setState({
        x:data.x,
        y:data.y,
        angle: data.angle
      });
    })
  }
	draw = (p5: p5Types) => {
    const {x, y, angle} = this.state;
		p5.background(0);
    p5.push()
    p5.translate(x,y)
    p5.rotate(angle)
		p5.rect(0, 0, 20, 20);
    p5.pop()
    p5.push()
    p5.translate(x,y)
    p5.rotate(angle)
    p5.stroke(200, 40, 40);
    p5.line(0, 0, 20, 20);
    p5.pop()
	};
  render() {
   
      return (
        <Sketch className={'magic'} setup={this.setup} draw={this.draw} />
      );
  }
}
export default Test;
