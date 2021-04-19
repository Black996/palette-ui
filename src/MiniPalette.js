import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";

class MiniPalette extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteId = this.handleDeleteId.bind(this);
    };

    handleDeleteId(e) {
        e.stopPropagation();
        this.props.showDeleteDialog(this.props.id);
        console.log(this.props.id);
    }

    render() {
        const { classes, paletteName, emoji, colors, handleClick } = this.props;
        const miniColorBoxes = colors.map(color => (
            <div
                className={classes.miniColor}
                style={{ backgroundColor: color.color }}
                key={color.name}
            ></div>
        ));
        return (
            <div className={classes.root} onClick={handleClick}>
                <DeleteIcon
                    className={classes.deleteIcon}
                    style={{ transition: "all 0.3s ease-in-out" }}
                    onClick={this.handleDeleteId}
                />
                <div className={classes.colors}>{miniColorBoxes}</div>
                <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span> </h5>
            </div>
        );
    }
}

export default withStyles(styles)(MiniPalette);