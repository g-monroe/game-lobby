/* eslint-disable */
import React from 'react';
import './BlockShoot.scss';
import {Player} from './canvas';
interface IBlockShootProps{
}
interface IBlockShootState{
  data: any;
}
class BlockShoot extends React.Component<IBlockShootProps, IBlockShootState> {
  static defaultProps = {
  }
  state: IBlockShootState = {
    data: undefined
  }
  render() {
   
      return (
       <>
       <canvas onClick={() => {
           //@ts-ignore
           console.log(Player.position);
           }} 
           id="canvas" width="500" height="600"></canvas>
       
       </>
      );
  }
}
export default BlockShoot;
