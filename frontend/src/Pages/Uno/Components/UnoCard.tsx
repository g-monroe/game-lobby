import React from "react"
import { CSSProperties } from "styled-components";
import '../Styles/UnoCard.scss';
interface IUnoCardProps {
    content: string;
    color: string;
    className?:string;
}
export default class UnoCard extends React.Component<IUnoCardProps> {
    getColor = (color:string) => {
        if (this.props.content == 'wild4' || this.props.content == 'wild' || this.props.content == 'back'){
            return "#000";
        }
        if (color == "red") {
          return "#C72A18"
        } else if (color == "yellow") {
          return "#E6CA1E"
        } else if (color == "blue") {
          return "#0063B3"
        } else if (color == "green") {
          return "#18A849"
        }
      }
      cssGetter = {
        background: (color:any) => {
          return {
            backgroundColor: this.getColor(color)
          }
        },
        text: (color:any) => {
          return {
            WebkitTextStroke: "3px " + this.getColor(color)
          }
        }
      }
      if69putline = (content:any) => {
      
      }
    constructor (props:any) {
      super(props)
    
    Object.defineProperty(this, "if69putline", {
      get: () => {
        if (this.props.content == "6" || this.props.content == "9") {
          return (
            <div className="underline-uno-text"
              style={this.cssGetter.text(this.props.color)}>
              _
            </div>
          )
        } else {
          return null
        }
      }
    })
    }
    
    content (type:any) {
      if (this.props.content.length > 2) {
        if (this.props.content == "wild4") {
            return "+4"
        }
        if (this.props.content == "wild") {
            return "◯"
        }
        if (this.props.content == "back") {
            return "UNO"
        }
      } else {
        return this.props.content
      }
    }
    
    render () {
      return (
        <div style={this.cssGetter.background(this.props.color)}
          className={`uno-card ${this.props.className}`}>
          <div className={`uno-inner ${this.props.content == 'back' ? 'uno-red' : ''} ${this.props.content == 'wild' ? 'uno-wild' : ''} ${this.props.content == 'wild4' ? 'uno-wild' : ''}`}></div>
          <div className="uno-flex">
            <div data-text={this.content.bind(this)(1)}
              className={`uno-text ${this.props.content == 'wild4' ? 'rainbox-text' : ''} ${this.props.content == 'wild' ? 'rainbox-text' : ''} ${this.props.content == 'back' ? 'uno-logo' : ''}`}
              style={this.cssGetter.text(this.props.color)}>
              {this.content.bind(this)(0)}
            </div>
            {this.if69putline}
          </div>
        </div>
      )
    }
  }