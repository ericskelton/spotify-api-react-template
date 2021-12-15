import react from "react";
import { Card, CardContent, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    flexContainer: {
        display: "flex",
        justifyContent: "center",
    },
    verticalFlexContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
});

export default function CenteredCard(props) {
    const { children } = props;
    const classes = useStyles();
    return (
        <div styles={classes.flexContainer}>
            <div styles={classes.verticalFlexContainer}>
                <Paper>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>{children}</CardContent>
                    </Card>
                </Paper>
            </div>
        </div>
    );
}
