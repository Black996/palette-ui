import React, { Component } from 'react';
import Slider from 'rc-slider';
import { Select, MenuItem, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from "@material-ui/styles";
import { Link } from 'react-router-dom';
import 'rc-slider/assets/index.css';
import styles from "./styles/NavbarStyles";


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
        const { level, changeLevel, showingSlider, classes } = this.props;
        const { format } = this.state;
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to="/">reactColorPicker</Link>
                </div>
                {showingSlider && (
                    <div>
                        <span>Level: {level}</span>
                        <div className={classes.slider}>
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
                <div className={classes.selectContainer}>
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

export default withStyles(styles)(Navbar);