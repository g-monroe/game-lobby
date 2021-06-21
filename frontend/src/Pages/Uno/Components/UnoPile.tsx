import React, { CSSProperties } from "react"
import UnoCard from "./UnoCard"
import '../Styles/UnoPile.scss';
interface IUnoPileProps {
  card1?:any;
  card2?:any;
  card3?:any;
  deck?:boolean;
  style?:CSSProperties;
  draw?: string;
}
export default class UnoPile extends React.Component<IUnoPileProps> {
    static defaultProps = {
      card1: {content: "1", color: "red"},
      card2: {content: "1", color: "green"},
      card3: {content: "1", color: "blue"},
      desk:false
    }
    render () {
      if (!this.props.deck){
        return (
          <div style={this.props.style} >
            <UnoCard className={'unoCard1'} color={this.props.card1.color} content={this.props.card1.content}/>
            <UnoCard className={'unoCard2'} color={this.props.card2.color} content={this.props.card2.content}/>
            <UnoCard className={`unoCard3`} color={this.props.card3.color} content={this.props.card3.content}/>
          </div>
        );
      }else{
        return (
          <div style={this.props.style}>
            <UnoCard className={`deck-unoCard1`} color={this.props.card1.color} content={'back'}/>
            <UnoCard className={`deck-unoCard2`} color={this.props.card2.color} content={'back'}/>
            <UnoCard className={`deck-unoCard3 uno-pile-${this.props.draw}`} color={this.props.card3.color} content={'back'}/>
          </div>
        );
      }
    }
  }