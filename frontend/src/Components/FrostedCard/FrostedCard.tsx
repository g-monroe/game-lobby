/* eslint-disable */
import React, { CSSProperties } from "react";
import "./FrostedCard.scss";

export interface IFrostedCardProps {
    renderContent: Function;
    className?: string;
}
 
export interface IFrostedCardState {

}
 
class FrostedCard extends React.Component<IFrostedCardProps, IFrostedCardState> {
   
    static defaultProps = {
    };

    state: IFrostedCardState = {
    };
    render() { 
        return (
            <>
            <div className={`frostedcard ${this.props.className}`}>
              {this.props.renderContent()}
            </div>
            </>
        );
        
    };
}
 
export default FrostedCard;