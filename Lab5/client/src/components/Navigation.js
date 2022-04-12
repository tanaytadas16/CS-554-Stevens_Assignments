import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const Navigation = () => {
    return (
        <AppBar position="static" color="primary" enableColorOnDark>
            <Container maxWidth="xxl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { md: 'flex' } }}
                    >
                        BINTEREST
                    </Typography>

                    <Box
                        className="justify-content-center"
                        sx={{
                            flexGrow: 1,
                            display: { md: 'flex' },
                        }}
                    >
                        <Button
                            variant="h5"
                            key="MYBIN"
                            // onClick={handleCloseNavMenu}
                            href="/my-bin"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            MY BIN
                        </Button>
                        <Button
                            variant="h5"
                            key="Image"
                            href="/"
                            // onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            IMAGES
                        </Button>
                        <Button
                            variant="h5"
                            key="MYPOST"
                            href="/my-posts"
                            // onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            MY POSTS
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navigation;
