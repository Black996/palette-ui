import React from 'react';
import clsx from 'clsx';
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from 'react-sortable-hoc';
import useStyles from "./styles/NewPaletteFormStyles"


NewPaletteForm.defaultProps = {
    maxColors: 20
}

function NewPaletteForm(props) {

    // another method for assigning states ###
    // const initialState = {
    //     open: false,
    //     currentColor: "teal",
    //     colors: [],
    //     colorName: ""
    // };

    // const [state, setState] = useState(initialState);

    // ##########

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [colors, setNewColors] = React.useState(props.palettes[0].colors);
    // const [newPaletteName, setNewPaletteName] = React.useState("");

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleAddColor = (newColor) => {
        setNewColors([...colors, newColor]);
    };



    // Uses the moved setNewPaletteName

    const handleSubmit = (newPalette) => {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
        newPalette.colors = colors;
        props.savePalette(newPalette)
        props.history.push("/");
    };

    const removeColor = (colorName) => {
        setNewColors(
            colors.filter(color => color.name !== colorName)
        )
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {

        setNewColors(arrayMove(colors, oldIndex, newIndex));
    };

    const clearColors = () => {
        setNewColors([]);
    };

    const addRandomColor = () => {
        const allColors = props.palettes.map(palette => palette.colors).flat();
        const randIdx = Math.floor(Math.random() * allColors.length);
        const randColor = allColors[randIdx];
        setNewColors([...colors, randColor]);
    }


    let paletteIsFull = colors.length >= props.maxColors;

    return (
        <div className={classes.root}>
            <PaletteFormNav
                open={open}
                palettes={props.palettes}
                handleSubmit={handleSubmit}
                handleDrawerOpen={handleDrawerOpen}
            />
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {<ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <div className={classes.container}>
                    <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
                    <div className={classes.buttons}>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="secondary"
                            onClick={clearColors}
                        >
                            Clear Palette
                            </Button>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            disabled={paletteIsFull}
                            onClick={addRandomColor}
                        >
                            Random Color
                            </Button>
                    </div>
                    <ColorPickerForm paletteIsFull={paletteIsFull} handleAddColor={handleAddColor} colors={colors} />
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorList
                    colors={colors}
                    removeColor={removeColor}
                    axis="xy"
                    onSortEnd={onSortEnd}
                />
            </main>
        </div>
    );
}

export default NewPaletteForm;