import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import logo from '../../assets/images/logo.png';

export const Splash = () => {

    return (
        <Box style={{ display: "flex", flex: 1 }}>
            <div style={{ width: '100%', height: '100vh', display: 'flex', flex: 1 }}>
                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Box style={{ flexDirection: 'column', width: '60%', display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ borderRadius: 1, width: 260, height: 150, p: "5", display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <Box
                                component="img"
                                sx={{ height: 150, cursor: "pointer" }}
                                alt="Logo"
                                src={logo}
                            />
                        </Box>
                        <CircularProgress size={30} sx={{ color: '#001051' }} />
                    </Box>
                </Box>
            </div>
        </Box>
    );
}