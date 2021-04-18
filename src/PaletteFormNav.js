import React from "react";
import PaletteMetaForm from "./PaletteMetaForm";
import { Link } from "react-router-dom";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { Button } from '@material-ui/core';
import useStyles from "./styles/PaletteFormNavStyles";


function PaletteFormNav(props) {
    const classes = useStyles();
    // const [newPaletteName, setNewPaletteName] = React.useState("")
    const { open, handleSubmit, handleDrawerOpen } = props;
    // const [formShow, setFormShow] = React.useState(false);

    // const handleFormShowing = () => {
    //     setFormShow(true);
    // }



    const [state, setState] = React.useState({
        openForm: false
    })

    const handleFormShowing = () => {
        setState({
            ...state,
            openForm: !state.openForm
        })
    }

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
                        <AddToPhotosIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create A Palette
          </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <Link to="/">
                        <Button variant="contained" color="secondary">Go Back</Button>
                    </Link>
                    <Button variant="outlined" color="primary" onClick={handleFormShowing}>
                        Save
                    </Button>
                </div>
            </AppBar>

            <PaletteMetaForm palettes={props.palettes} handleSubmit={handleSubmit} openForm={state.openForm} handleFormShowing={handleFormShowing} />

        </div>
    )
}

export default PaletteFormNav;