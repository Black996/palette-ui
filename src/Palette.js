import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import "./Palette.css";

class Palette extends Component {
    render() {
        const colorBoxes = this.props.colors.map(color => (
            <ColorBox background={color.color} name={color.name} />
        ))
        return (
            <div className="Palette">
                {/* {Navbar here} */}
                <div className="Palette-colors">{colorBoxes}</div>
                {/*A bunch of color boxes */}
                {/*A footer */}
            </div>
        )
    }
}

export default Palette;