/* eslint-disable */
import React, { CSSProperties } from "react";
import { Tooltip } from 'antd';
import "./Avatar.scss";
export interface IAvatarProps {
    AvatarType: string;
    color: string;
    type: string;
    name: string;
    containerStyle?: CSSProperties;
    imgStyle?: CSSProperties;
    containerClassName?: string;
    imgClassName?: string;
    customName?:string;
    onClick?:Function;
    tag?: string;
}
 
export interface IAvatarState {
    hoverOver:boolean;
}
export let bounceRnd = () =>{
    return('bounce' + Math.random().toString(36).substring(7));
}
class Avatar extends React.Component<IAvatarProps, IAvatarState> {
   
    static defaultProps = {
        customName: bounceRnd()
    };
    
    state: IAvatarState = {
        hoverOver:false
    };
    avaStyle = () =>{
        return {
            margin: "25px auto"
        }
    }

    onMouseClick = () =>{
        const {name, type, onClick} = this.props;
        if (this.props.onClick !== undefined){
            console.log("clicked");
            onClick!(type, name);
        }
    }
    imageStyle = () =>{
        if (!this.state.hoverOver){
            return {
                height: "200px",
                width: "200px",
                backgroundColor: `${this.props.color}`,
                boxShadow: `0 0 0 5px ${this.props.color}`,
                borderRadius: "50%",
                
            }
        }
        return {
            height: "200px",
            width: "200px",
            backgroundColor: `${this.props.color}`,
            boxShadow: `0 0 0 5px ${this.props.color}`,
            borderRadius: "50%",
            cursor: "pointer",
            animation:`${this.props.customName} .4s linear`
        }
    }
    render() { 
        return (
            <>
            
            <div onMouseUp={() => {this.onMouseClick()}} style={{...this.props.containerStyle, ...this.avaStyle()}} className={`avatar ${this.props.containerClassName}`}>
                <a title={this.props.tag} onMouseEnter={() =>{ this.setState({hoverOver: true})}} onMouseLeave={() =>{ this.setState({hoverOver: false})}} href="#">
                    <img src={this.props.AvatarType } style={{...this.props.imgStyle, ...this.imageStyle()}} className={`user ${this.props.imgClassName}`}/>
                </a>
            </div>
            <style>
                {`
                @keyframes ${this.props.customName} {
                    0%{ box-shadow: 0 0 0 4px ${this.props.color}; opacity:1;}
                    25%{ box-shadow: 0 0 0 1px ${this.props.color}; opacity:1;}
                    50%{ box-shadow: 0 0 0 7px ${this.props.color}; opacity:1; }
                    75%{ box-shadow: 0 0 0 4px ${this.props.color}; opacity:1;}
                    100%{ box-shadow: 0 0 0 5px ${this.props.color}; opacity:1;}
                }`}
            </style>
            </>
        );
        
    };
}
 
export default Avatar;