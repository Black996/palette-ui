import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from './PaletteFooter';
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";


class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = { format: "hex" };
        this.changeFormat = this.changeFormat.bind(this);
    }
    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;
        for (let level in allColors) {
            shades = shades.concat(
                allColors[level].filter(color => color.id === colorToFilterBy)
            )
        }
        // return all shades of a given color
        return shades.slice(1);
    }

    changeFormat(val) {
        this.setState({ format: val });
    }

    render() {
        const { classes } = this.props;
        const { paletteName, emoji, id } = this.props.palette;
        const { format } = this.state;
        const colorBoxes = this._shades.map(color => (
            <ColorBox key={color.name} name={color.name} background={color[format]} showingFullPalette={false} />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.changeFormat} showingSlider={false} />
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>
                            GO BACK
                            </Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);