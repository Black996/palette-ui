import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorBox from './DraggableColorBox';

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


function NewPaletteForm(props) {

    // const initialState = {
    //     open: false,
    //     currentColor: "teal",
    //     colors: [],
    //     colorName: ""
    // };

    // const [state, setState] = useState(initialState);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [currentColor, setColor] = React.useState("teal");
    const [colors, setNewColors] = React.useState([]);
    const [colorName, setcolorName] = React.useState("");
    const [newPaletteName, setNewPaletteName] = React.useState("");

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
        if (evt.target.name === "newPaletteName") setNewPaletteName(newPaletteName => evt.target.value);
    };

    const handleSubmit = () => {
        let newName = newPaletteName;
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, "-"),
            colors: colors
        }
        props.savePalette(newPalette)
        props.history.push("/");
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
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
            return props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    });

    // const updateColor = (newColor) => {
    //     setCurrentColor(newColor.hex)
    // }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                color="default"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Persistent drawer
          </Typography>
                    <ValidatorForm onSubmit={handleSubmit}>
                        <TextValidator
                            label="Palette Name"
                            value={newPaletteName}
                            onChange={handleChange}
                            name="newPaletteName"
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter Palette Name", "Palette name already used"]}
                        />
                        <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                    </ValidatorForm>
                </Toolbar>
            </AppBar>
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
                    <Button variant="contained" color="secondary">Clear Palette</Button>
                    <Button variant="contained" color="primary">Random Color</Button>
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
                        validators={["isColorNameUnique", "isColorUnique"]}
                        errorMessages={["Color name must be unique", "Color already used"]}
                    />
                    <Button variant="contained" style={{ backgroundColor: currentColor }} type="submit">Add Color</Button>
                </ValidatorForm>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {colors.map(color => (<DraggableColorBox color={color.color} name={color.name} />))}
            </main>
        </div>
    );
}

export default NewPaletteForm;