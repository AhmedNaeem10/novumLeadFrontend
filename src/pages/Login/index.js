import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { login } from "../../apis";
import image from '../../assets/images/lead.jpeg';
import logo from '../../assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { adminLogin } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../constants/RouteConstants";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleError = () => {
        setError(!error);
    }

    const handleLogin = async () => {
        if (!username || !password) {
            setError(true);
            setErrorMsg("Please fill the required fields.")
            return;
        }
        setLoading(true);
        const response = await login(username, password);
        setLoading(false);
        if (response) {
            setError(false);
            dispatch(adminLogin({ username, token: response.token, id: response.id, name: response.name }));
            navigate(ROUTE_CONSTANTS.BOOKINGS, { replace: true })

        } else {
            setErrorMsg("Invalid credentials.")
            toggleError();
        }
    }
    return (
        <Box style={{ display: "flex", flex: 1, width: '100%' }}>
            <div style={{ width: '100%', height: '100vh', display: 'flex', flex: 1 }}>
                <Box sx={{ flex: 1, display: "flex", flexDirection: 'row' }}>
                    <Box sx={{ flex: 1, p: 15, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ flex: 1 }}>
                            <Box
                                component="img"
                                sx={{ width: 150, cursor: "pointer", objectFit: 'cover' }}
                                alt="Logo"
                                src={logo}
                            />
                        </Box>

                        <Box sx={{ flex: 3 }}>
                            <Typography variant="h4" sx={{ textAlign: 'center', mb: 7, color: '#001051' }}>Lead Painter Login</Typography>
                            <TextField
                                required
                                id="email"
                                label="Email"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value); setError(false); }}
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                sx={{ mt: 5 }}
                                required
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(false) }}
                                type={'password'}
                                id="password"
                                label="Password"
                                fullWidth
                                variant="standard"
                            />
                            {
                                error && <Typography sx={{ mt: 1, color: 'red' }}>{errorMsg}</Typography>
                            }
                            <Button onClick={handleLogin} style={{ mt: 3, backgroundColor: '#001051', color: 'white', width: '100%', marginTop: 20 }}><Typography style={{ padding: 5, paddingLeft: 70, paddingRight: 70 }}>Login</Typography></Button>
                        </Box>
                    </Box>
                    <Box
                        component="img"
                        sx={{ flex: 1, cursor: "pointer", justifyContent: 'flex-end', objectFit: 'cover' }}
                        alt="Logo"
                        src={image}
                    />
                </Box>
            </div>
        </Box>
    )
}