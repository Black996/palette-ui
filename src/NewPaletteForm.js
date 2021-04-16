import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
                <Typography variant="h4" >Design Your Palette</Typography>
                <div>
                    <Button variant="contained" color="secondary" onClick={clearColors}>Clear Palette</Button>
                    <Button variant="contained" color="primary" disabled={paletteIsFull} onClick={addRandomColor}>Random Color</Button>
                </div>
                <ColorPickerForm paletteIsFull={paletteIsFull} handleAddColor={handleAddColor} colors={colors} />
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