import React from 'react';
import clsx from 'clsx';
import { arrayMove } from 'react-sortable-hoc';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import DraggableColorList from "./DraggableColorList";
import seedColors from "./seedColors";
import useStyles from "./styles/NewPaletteFormStyles"


NewPaletteForm.defaultProps = {
    maxColors: 20
}

function NewPaletteForm(props) {


    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [colors, setNewColors] = React.useState(seedColors[0].colors);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleAddColor = (newColor) => {
        setNewColors([...colors, newColor]);
    };


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

        let isDuplicateColor = true
        while (isDuplicateColor) {
            let randColor;
            let randIdx = Math.floor(Math.random() * allColors.length);
            randColor = allColors[randIdx];
            if (colors.some(color => color.name === randColor.name)) {
                continue;
            } else {
                isDuplicateColor = false
                setNewColors([...colors, randColor]);
            }

        }

    }

    // const allColors = props.palettes.map(palette => palette.colors).flat();
    // const randIdx = Math.floor(Math.random() * allColors.length);
    // const randColor = allColors[randIdx];
    // setNewColors([...colors, randColor]);

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
                    distance={20}
                />
            </main>
        </div>
    );
}

export default NewPaletteForm;