import React, { Component } from 'react'
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/ColorPickerFormStyle";


class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = { currentColor: "teal", colorName: "" }
    }

    updateCurrentColor = (newColor) => {
        this.setState({ currentColor: newColor.hex });
    };

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: [evt.target.value] });
    };

    handleSubmit = () => {
        const newColor = { color: this.state.currentColor, name: this.state.colorName }
        this.setState({ colorName: "" })
        this.props.handleAddColor(newColor);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isColorUnique", () => {
            return this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            );
        });
        ValidatorForm.addValidationRule("isColorNameUnique", value => {
            return this.props.colors.every(
                ({ name }) => name.toString().toLowerCase() !== value.toString().toLowerCase()
            );
        });
    }

    render() {
        const { paletteIsFull, classes } = this.props;
        const { currentColor, colorName } = this.state;
        return (
            <div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                        value={colorName}
                        variant="filled"
                        margin="normal"
                        placeholder="Color Name"
                        onChange={this.handleChange}
                        name="colorName"
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={["Must have a name", "Color name must be unique", "Color already used"]}
                        className={classes.colorNameInput}
                    />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
                        type="submit"
                        disabled={paletteIsFull}
                        className={classes.addColor}
                    >
                        {paletteIsFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);