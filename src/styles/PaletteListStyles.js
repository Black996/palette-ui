import sizes from "./sizes";
import bg from "./bg.svg";

const styles = {

    "@global": {
        ".fade-exit": {
            opacity: 1
        },
        ".fade-exit-active": {
            opacity: 0,
            transition: "opactiy 500ms ease-out"
        }
    },
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#3192faa",
        // background by SVGBackgrounds.com
        backgroundImage: `url(${bg})`,
        overflow: "scroll"
    },
    heading: {
        fontSize: "2rem"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down("lg")]: {
            width: "65%"
        },
        [sizes.down("md")]: {
            width: "75%"
        },
        [sizes.down("sm")]: {
            width: "85%"
        },
        [sizes.down("xs")]: {
            width: "100%"
        }
    },
    nav: {
        marginTop: "-30px",
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white",
        alignItems: "center",
        "& a": {
            color: "white"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3,30%)",
        gridGap: "1.7rem",
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2,50%)",
            gridGap: "1rem"
        },
        [sizes.down("xs")]: {
            width: "75%",
            gridTemplateColumns: "repeat(1,100%)",
            gridGap: "1rem"
        }
    }
}

export default styles;