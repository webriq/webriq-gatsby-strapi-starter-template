import React from "react";
import SideBar from "react-sidebar";
import { Motion, spring, presets} from 'react-motion'
import Menu from "./Menu"

class SideBarMenu extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
        sidebarOpen: false,
        sidebarpullRight: true,
        toggle: false
      };

      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }
    onSetSidebarOpen(state) {
      this.setState({ sidebarOpen: state.open,  toggle: !this.state.toggle});
    }
    toggleMenu () {
      this.setState({sidebarOpen: !this.state.sidebarOpen, toggle: !this.state.toggle})
    }
  render(){
    const style = {
      overflow: 'visible',
      cursor: 'pointer',
      // disable touch highlighting on devices
      WebkitTapHighlightColor: "rgba(0,0,0,0)",
    }
    return(
        <SideBar
          sidebar={
            <Menu/> // Menu list
          }
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          pullRight={this.state.sidebarpullRight}
          styles={{
          sidebar: {
            background: "white",
            width: "300px",
            position: "fixed",
            zIndex: "3"
          },
          root: { position: 'relative', overflow: 'visible' },
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: 2 },
          content: {
            position: 'relative',
            overflow: 'visible',
            cursor: 'pointer',
          },
        }} >
          <h2 className="bm-burger-button float-right text-white" onClick={() => this.toggleMenu()}>
           <svg 
              viewBox="0 0 96 96"
              height="1em"
              style={style}
            >
              <Motion 
                style={{
                  x: spring(this.state.toggle ? 1 : 0, presets.wobbly ),
                  y: spring(this.state.toggle ? 0: 1, presets.wobbly ),
                }}
              >
                {({ x, y }) =>
                  <g 
                    id="navicon" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="10" 
                    strokeLinecap="butt" 
                    strokeLinejoin="round"
                   >
                    <line transform={`translate(${x * 12}, ${x * -7}) rotate(${x * 45}, 7, 26)`} x1="7" y1="26" x2="89" y2="26"/>
                    <line transform={`translate(${x * 12}, ${x * 7}) rotate(${x * -45}, 7, 70)`} x1="7" y1="70" x2="89" y2="70"/>
                    <line transform={`translate(${x * -96})`} opacity={y} x1="7" y1="48" x2="89" y2="48"/>
                  </g>
                }
              </Motion>
            </svg>
        </h2>
        </SideBar>
    )
  }
}

export default SideBarMenu