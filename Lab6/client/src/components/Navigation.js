import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <AppBar
            position="static"
            color="primary"
            enableColorOnDark
            style={{ backgroundColor: '#1976d2', color: 'white' }}
        >
            <Container maxWidth="xxl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { md: 'flex' } }}
                    >
                        Pokedex
                    </Typography>

                    <Box
                        className="justify-content-center"
                        sx={{
                            flexGrow: 1,
                            // display: { md: 'flex' },
                        }}
                    >
                        <div className="Link-Group">
                            <div className="m-1">
                                <Link style={{ color: 'white' }} to="/">
                                    HOME
                                </Link>{' '}
                            </div>
                            <div className="m-1">
                                <Link
                                    style={{ color: 'white' }}
                                    to="/pokemon/page/0"
                                >
                                    POKEMON
                                </Link>
                            </div>
                            <div className="m-1">
                                <Link style={{ color: 'white' }} to="/trainers">
                                    TRAINERS
                                </Link>
                            </div>
                        </div>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navigation;
