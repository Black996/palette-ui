import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from "../constants";
import sizes from "./sizes";


const drawerWidth = DRAWER_WIDTH;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    hide: {
        display: 'none',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        height: "64px"
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
    navBtns: {
        marginRight: "0.5rem",
        margin: "auto 0",
        "& a": {
            TextDecoration: "none"
        },
        [sizes.down("xs")]: {
            marginRight: "0.5rem"
        }
    },
    button: {
        margin: "0 0.5rem",
        [sizes.down("xs")]: {
            margin: "0.2rem",
            padding: "0.3rem"
        }
    }
}));

export default useStyles;