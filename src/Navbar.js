import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
import { Select, MenuItem, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import 'rc-slider/assets/index.css';
import "./Navbar.css";
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: "hex", open: false };
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
    handleFormatChange(evt) {
        this.setState({ format: evt.target.value, open: true });
        this.props.handleChange(evt.target.value);
    }

    closeSnackbar() {
        this.setState({ open: false });
    }

    render() {
        const { level, changeLevel, showingSlider } = this.props;
        const { format } = this.state;
        return (
            <header className="Navbar">
                <div className="logo">
                    <Link to="/">reactColorPicker</Link>
                </div>
                {showingSlider && (
                    <div className="slider-container">
                        <span>Level: {level}</span>
                        <div className="slider">
                            <Slider
                                defaultValue={level}
                                min={100}
                                max={900}
                                step={100}
                                onAfterChange={changeLevel}
                            />
                        </div>
                    </div>
                )}
                <div className="select-container">
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value="hex">Hex - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb 255,255,255</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba 255,255,255,1.0</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={<span id="message-id">Format changed to {format.toUpperCase()}</span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </header>
        )
    }
}

export default Navbar;