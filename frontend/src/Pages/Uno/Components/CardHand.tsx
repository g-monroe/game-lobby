import React from "react"
import UnoCard from "./UnoCard"
import '../Styles/CardHand.scss';
import { ThisExpression } from "typescript";
import Avatar from "../../../Components/Avatar/Avatar";
import { AnimalAvatar } from "../../../assets/avatars/Avatars";
interface ICardHandProps {
  myHand: boolean;
  cards: any;
  position: string;
}
export default class CardHand extends React.Component<ICardHandProps> {
    static defaultProps = {
      numberOfCards: 10
    }
    render () {
      const {myHand, cards} = this.props;
      const avatar = new AnimalAvatar;
      if (!myHand){
        return (
          <>
          <div className={`cards ${this.props.position}`}>
            <Avatar tag={"User#4544"} containerClassName={`uno-player-${this.props.position}`} type={'animals'} name={'giraffe'} color={"#2ABA3A"} imgClassName={"uno-player-img"} AvatarType={avatar.giraffe} />
            {cards.map((name: any, index:number) => {
              return (<>
                <UnoCard className={`uno-hand uno-hand-${this.props.position}`} content={'back'} color='red'/>
              </>);
            })}
          </div>
          </>
        );
      }else{
        return (
          <div>
            <p>nope</p>
          </div>
        );
      }
    }
  }