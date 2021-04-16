import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PaletteFormNav from "./PaletteFormNav";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));


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
    const [currentColor, setColor] = React.useState("teal");
    const [colors, setNewColors] = React.useState(props.palettes[0].colors);
    const [colorName, setcolorName] = React.useState("");
    // const [newPaletteName, setNewPaletteName] = React.useState("");

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const updateCurrentColor = (newColor) => {
        setColor(newColor.hex);
    };

    const handleAddColor = () => {
        const newColor = { color: currentColor, name: colorName }
        setNewColors([...colors, newColor]);
        setcolorName("");
    };

    const handleChange = (evt) => {
        if (evt.target.name === "colorName") setcolorName(colorName => colorName = evt.target.value);
        // Moved to PaletteFormNav
        // if (evt.target.name === "newPaletteName") setNewPaletteName(newPaletteName => evt.target.value);
    };

    // Uses the moved setNewPaletteName

    const handleSubmit = (newPaletteName) => {
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            colors: colors
        }
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
        console.log(allColors);
    }


    useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", value => {
            return colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule("isColorUnique", value => {
            return colors.every(
                ({ color }) => color !== currentColor
            );
        });
    });

    // const updateColor = (newColor) => {
    //     setCurrentColor(newColor.hex)
    // }

    let paletteIsFull = colors.length >= props.maxColors;

    return (
        <div className={classes.root}>
            <PaletteFormNav
                open={open}
                classes={classes}
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
                <div>
                    <Button variant="contained" color="secondary" onClick={clearColors}>Clear Palette</Button>
                    <Button variant="contained" color="primary" disabled={paletteIsFull} onClick={addRandomColor}>Random Color</Button>
                </div>
                <Typography variant="h4" >Design Your Palette</Typography>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={updateCurrentColor}
                />
                <ValidatorForm onSubmit={handleAddColor}>
                    <TextValidator
                        value={colorName}
                        onChange={handleChange}
                        name="colorName"
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={["Must have a name", "Color name must be unique", "Color already used"]}
                    />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
                        type="submit"
                        disabled={paletteIsFull}
                    >
                        {paletteIsFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>
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