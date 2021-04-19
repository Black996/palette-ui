import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

class PaletteMetaForm extends Component {

    state = {
        newPaletteName: "",
        stage: "form"
    };

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: [evt.target.value] });
    };

    showEmojiPicker = () => {
        this.setState({ stage: "emoji" });
    }

    savePalette = (emoji) => {
        const newPalette = { paletteName: this.state.newPaletteName[0], emoji: emoji.native };
        this.props.handleSubmit(newPalette);
        this.setState({ stage: "" })
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
            return this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toString().toLowerCase()
            );
        });
    };


    render() {
        const { newPaletteName, stage } = this.state;
        const { openForm, handleFormShowing } = this.props;

        return (
            <div>
                <Dialog
                    open={stage === "emoji"}
                // onClose={handleFormShowing} if you want this feature add openFormm && to the open prop to this Dialog
                >
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <Picker
                        onSelect={this.savePalette}
                        title="Pick A Palette Emoji"
                    />
                </Dialog>
                <Dialog
                    open={openForm && stage === "form"}
                    onClose={handleFormShowing}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your new palette. Make sure it's unique!
                             </DialogContentText>
                            <TextValidator
                                label="Palette Name"
                                value={newPaletteName}
                                onChange={this.handleChange}
                                fullWidth
                                margin="normal"
                                name="newPaletteName"
                                validators={["required", "isPaletteNameUnique"]}
                                errorMessages={["Enter Palette Name", "Palette name already used"]}
                            />
                            {/* <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        /> */}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleFormShowing} color="primary">
                                Cancel
            </Button>
                            <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div >
        );
    }
}

export default PaletteMetaForm