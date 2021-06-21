/* eslint-disable */
import React, { CSSProperties } from "react";
import CardHand from "./Components/CardHand";
import UnoCard from "./Components/UnoCard";
import UnoPile from "./Components/UnoPile";
import './Uno.scss';
export interface IUnoProps {
}
 
export interface IUnoState {
    cardContent: string;
    cardColor: string;
}
 
class Uno extends React.Component<IUnoProps, IUnoState> {
   
    static defaultProps = {
    };

    state: IUnoState = {
        cardContent: "1",
        cardColor: "red"
    };
    
    cardContentChange =(e:any) =>{
      this.setState({cardContent: e.target.value})
    }
    
    cardColorChange = (e:any) => {
      this.setState({cardColor: e.target.value})
    }
    
    render () {
      return (
        <div>
            <div className={'uno-piles'}>
                <UnoPile deck={true} style={{left:'55%', top:'40%', position:'absolute'}} draw={'top'} />
                <UnoPile style={{left:'40%', top:'40%', position:'absolute'}}  draw={'top'} />
            </div>
            <CardHand position={'bottom'} cards={[1,2,3,4,5,6,7,8,9]} myHand={false}/>
            <CardHand position={'top'} cards={[1,2,3,4,5,6,7,8,9]} myHand={false}/>
        </div>
        
      );
    }
}
 
export default Uno;