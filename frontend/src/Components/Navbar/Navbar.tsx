/* eslint-disable */
import React from "react";
import "./Navbar.css";
import { serverPing, SocketIO } from '../../Handlers/socket';

export interface INavBarProps {
}
 
export interface INavBarState {
    active:boolean;
    latency: number;
}

class NavBar extends React.Component<INavBarProps, INavBarState> {
   
    static defaultProps = {
    };
    state: INavBarState = {
        active:false,
        latency: -999
    };
    updateStatus = (ms:number) =>{
      this.setState({
        latency:ms
      })
    }
    renderLatency = () =>{
      if (this.state.latency === -999){
        return "Pinging Server";
      }else{
        return this.state.latency.toString();
      }
    }
    componentDidMount(){
      
      window.addEventListener('storage', serverPing)
    }
  
    componentWillUnmount(){
       window.removeEventListener('storage', serverPing)
    }
  
    
    toggle = (e:any) =>{
        let active = this.state.active;
        var burger = document.querySelector('.burger');
        var menu = document.querySelector('.menu');
        var menuList = document.querySelector('.menu__list');
        var brand = document.querySelector('.menu__brand');
        var menuItems = document.querySelectorAll('.menu__item');
        if (!active) {
            menu!.classList.add('menu--active');
            menuList!.classList.add('menu__list--active');
            brand!.classList.add('menu__brand--active');
            burger!.classList.add('burger--close');
            for (var i = 0, ii = menuItems.length; i < ii; i++) {
              menuItems[i].classList.add('menu__item--active');
            }
            this.setState({
                active:true
            });
          } else {
            menu!.classList.remove('menu--active');
            menuList!.classList.remove('menu__list--active');
            brand!.classList.remove('menu__brand--active');
            burger!.classList.remove('burger--close');
            for (var i = 0, ii = menuItems.length; i < ii; i++) {
              menuItems[i].classList.remove('menu__item--active');
            }
            this.setState({
                active:false
            });
          }
    }
    
    render() { 
        return (<>
            <SocketIO pongCallback={this.updateStatus}/>
            <header className="header">
            <div onClick={ this.toggle} className="burger">
              <div className="burger__patty"></div>
              <div className="burger__patty"></div>
              <div className="burger__patty"></div>
            </div>
      
            <nav className="menu">
              <div className="menu__brand">
                <a href=""><div className="logo"></div></a>
              </div>
              <ul className="menu__list">
                <li className="menu__item"><a href="https://gavinmonroe.dev" className="menu__link">Gavin Monroe</a></li>
                <li className="menu__item"><a href="https://gavinmonroe.dev/blog/" className="menu__link">About</a></li>
                <li className="menu__item"><a href="https://gavinmonroe.dev/blog/" className="menu__link">Server Status: {this.renderLatency()}</a></li>
              </ul>
            </nav>
          </header></>
      
        );
        
    };
}
 
export default NavBar;