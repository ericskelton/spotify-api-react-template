import react from "react";
import CenteredCard from "../General/CenteredCard";

export default function NotFound() {
    return (
        <CenteredCard>
            <Typography>Error</Typography>
            <Typography
                variant="h5"
                sx={{ fontSize: 14 }}
                color="text.secondary"
                component="div"
            >
                404, Page Not Found
            </Typography>
            <Game />
        </CenteredCard>
    );
}
