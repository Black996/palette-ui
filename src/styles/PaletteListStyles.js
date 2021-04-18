import sizes from "./sizes";

const styles = {
    root: {
        backgroundColor: "blue",
        height: "110vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
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
        gridGap: "2.5rem",
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2,50%)",
            gridGap: "1.5rem"
        },
        [sizes.down("xs")]: {
            width: "75%",
            gridTemplateColumns: "repeat(1,100%)",
            gridGap: "1rem"
        }
    }
}

export default styles;