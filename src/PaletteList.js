import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteListStyles";
import { blue, red } from '@material-ui/core/colors';

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDeleteDialog: false,
            deleteingId: ""
        }
    };

    toggleDeleteDialog = (id) => {
        this.setState({ openDeleteDialog: !this.state.openDeleteDialog })
        this.setState({ deleteingId: id });
    }

    goToPalette = (id) => {
        this.props.history.push(`/palette/${id}`);
    }

    closeDeleteDialog() {
        this.setState({ openDeleteDialog: false, deleteingId: "" })
    }

    handleDelete = () => {
        this.props.deletePalette(this.state.deleteingId)
        this.closeDeleteDialog();
    }

    render() {
        const { openDeleteDialog } = this.state;
        const { palettes, classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map((palette) => (
                            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                                <MiniPalette
                                    {...palette}
                                    key={palette.id}
                                    goToPalette={this.goToPalette}
                                    // deletePalette={this.props.deletePalette}
                                    showDeleteDialog={this.toggleDeleteDialog}

                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={this.toggleDeleteDialog} >
                    <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar
                                    style={{ backgroundColor: blue[100], color: blue[600] }}
                                >
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete" />
                        </ListItem>
                        <ListItem button onClick={this.toggleDeleteDialog}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel" />
                        </ListItem>
                    </List>
                </Dialog>
            </div >
        )
    }
}

export default withStyles(styles)(PaletteList);
