import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function Layout({ children }) {
    return (
        <>
            <AppBar position="static">
                <Toolbar className="gap-3">
                    <SmartToyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: "#fff", fontSize: 30 }} />
                    <Button color="inherit" component={Link} to="/library">
                        Library
                    </Button>
                    <Button color="inherit" component={Link} to="/add">
                        Add Paper
                    </Button>
                    <Button color="inherit" component={Link} to="/analytics">
                        Analytics
                    </Button>
                </Toolbar>
            </AppBar>

            <Container className="py-6">{children}</Container>
        </>
    );
}
