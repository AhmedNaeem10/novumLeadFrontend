import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Card, CardHeader, CircularProgress, FormControlLabel, IconButton, MenuItem, Select, Switch, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateBooking } from '../../../apis';

export const ManageBooking = ({ setData, data, closeBackdrop, setChange, change, setText, setOpenFailed, setOpenSuccess, leadPainters }) => {
    const [bookingName, setBookingName] = useState("");
    const [bookingLocation, setBookingLocation] = useState("");
    const [bookingPhone, setPhone] = useState("");
    const [estimatedLiters, setEstimatedLiters] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [area, setArea] = useState("");
    const [levels, setLevels] = useState("");
    const [kitchens, setKitchens] = useState("");
    const [lounges, setLounges] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [rooms, setRooms] = useState("");
    const [address, setAdress] = useState("");
    const [isInterior, setIsInterior] = useState();
    const [type, setVenueType] = useState("");
    const [bookingStatus, setBookingStatus] = useState("");
    const [projectStatus, setProjectStatus] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [inspectionDate, setInspectionDate] = useState("");
    const [leadPainter, setLeadPainter] = useState("");
    const [bill, setBill] = useState("");
    const [productSpecification, setProductSpecification] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setBookingLocation(data?.Venue?.location);
        setBookingName(data?.bookingName);
        setPhone(data?.bookingPhone);
        setEstimatedLiters(data?.estimatedLiters);
        setEstimatedTime(data?.estimatedDays);
        setArea(data?.Venue?.venueArea);
        setLevels(data?.Venue?.levels);
        setKitchens(data?.Venue?.kitchens);
        setLounges(data?.Venue?.lounges);
        setBathrooms(data?.Venue?.bathrooms);
        setRooms(data?.Venue?.rooms);
        setAdress(data?.Venue?.address);
        setIsInterior(data?.Venue?.isInterior);
        setVenueType(data?.Venue?.venueType || 'Select Venue Type')
        setBookingStatus(data?.bookingStatus || 'Booking Status')
        setProjectStatus(data?.projectStatus || 'Project Status');
        setLeadPainter(data?.leadPainterId || 'Select Lead Painter')
        setStartDate(data?.startDate);
        setEndDate(data?.endDate);
        setInspectionDate(data?.inspectionDate);
        setProductSpecification(data?.productSpecification);
        setBill(data?.bill);
    }, [data])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            bookingName,
            bookingPhone,
            isNew: false,
            estimatedLiters,
            estimatedDays: estimatedTime,
            startDate,
            endDate,
            inspectionDate,
            bookingStatus,
            projectStatus,
            venueId: data?.Venue?.id,
            leadPainterId: typeof (leadPainter) == 'string' ? null : leadPainter,
            bill,
            productSpecification,
            isInterior,
            venue: {
                id: data?.Venue?.id,
                venueType: type,
                venueArea: area,
                location: bookingLocation,
                levels,
                rooms,
                lounges,
                kitchens,
                bathrooms,
                isInterior,
                address
            }
        }
        setLoading(true);
        const response = await updateBooking(data?.id, payload);
        setLoading(false);
        if (response.code === 200) {
            setText("Booking successfully updated!");
            setOpenSuccess(true);
        } else {
            setText("There was an error while updating the Booking!");
            setOpenFailed(true);
        }

        setChange(!change);
        closeBackdrop();
        setData({});
    };

    const handleVenueTypeChange = (event) => {
        setVenueType(event.target.value)
    }

    return (

        <Card sx={{ padding: 2, width: "80%" }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings"
                        onClick={closeBackdrop}
                    >
                        <CloseIcon sx={{ alignSelf: "flex-end" }} />
                    </IconButton>
                }
                title={"Manage Appointment"}
                sx={{ color: "black" }}
            />

            <Container component="main">
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                        <TextField
                            value={bookingName}
                            sx={{ m: 1, flex: 1 }}
                            margin="normal"
                            required
                            id="title"
                            onChange={(e) => {
                                setBookingName(e.target.value);
                            }}
                            label="Booking Name"
                            name="title"
                            autoComplete="title"
                            autoFocus
                        />
                        <TextField
                            value={bookingLocation}
                            sx={{ m: 1, flex: 2 }}
                            margin="normal"
                            required
                            id="price"
                            label="Booking Location"
                            name="price"
                            autoComplete="price"
                            autoFocus
                            onChange={(e) => {
                                setBookingLocation(e.target.value);
                            }}
                        />

                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                        <TextField
                            value={bookingPhone}
                            sx={{ m: 1 }}
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Booking Phone"
                            name="price"
                            autoComplete="price"
                            autoFocus
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                        />
                        <TextField
                            value={estimatedLiters}
                            sx={{ m: 1 }}
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Estimeted Litres"
                            name="price"
                            autoComplete="price"
                            autoFocus
                            onChange={(e) => {
                                setEstimatedLiters(e.target.value);
                            }}
                        />
                        <TextField
                            value={estimatedTime}
                            sx={{ m: 1 }}
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Estimated Time"
                            name="price"
                            autoComplete="price"
                            autoFocus
                            onChange={(e) => {
                                setEstimatedTime(e.target.value);
                            }}
                        />
                    </div>
                    <Typography variant='h6' sx={{ mt: 2 }}>Venue Details</Typography>
                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                        <TextField
                            value={area}
                            sx={{ m: 1 }}
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Area"
                            name="price"
                            autoComplete="price"
                            autoFocus
                            onChange={(e) => {
                                setArea(e.target.value);
                            }}
                        />
                        <TextField
                            value={levels}
                            sx={{ m: 1 }}
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Levels"
                            name="price"
                            autoComplete="price"
                            autoFocus
                            onChange={(e) => {
                                setLevels(e.target.value);
                            }}
                        />
                        <TextField
                            value={rooms}
                            sx={{ m: 1 }}
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Rooms"
                            name="price"
                            autoComplete="price"
                            autoFocus
                            onChange={(e) => {
                                setRooms(e.target.value);
                            }}
                        />
                        <TextField
                            value={lounges}
                            sx={{ m: 1 }}
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Lounges"
                            name="price"
                            autoComplete="price"
                            autoFocus
                            onChange={(e) => {
                                setLounges(e.target.value);
                            }}
                        />
                        <TextField
                            value={kitchens}
                            sx={{ m: 1 }}
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Kitchens"
                            name="price"
                            autoComplete="price"
                            autoFocus
                            onChange={(e) => {
                                setKitchens(e.target.value);
                            }}
                        />
                        <TextField
                            value={bathrooms}
                            sx={{ m: 1 }}
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Bathrooms"
                            name="price"
                            autoComplete="price"
                            autoFocus
                            onChange={(e) => {
                                setBathrooms(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            value={address}
                            sx={{ m: 1 }}
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Complete Address"
                            name="price"
                            autoComplete="price"
                            autoFocus
                            onChange={(e) => {
                                setAdress(e.target.value);
                            }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', alignItems: "center" }}>
                        <Select
                            defaultValue='Select Venue Type'
                            value={type}
                            onChange={handleVenueTypeChange}
                            variant="outlined"
                            inputProps={{ 'aria-label': 'language' }}
                            sx={{
                                m: 1,
                                color: 'black',
                                '& .MuiSelect-select': {
                                    '&:focus': {
                                        backgroundColor: 'transparent',
                                    },
                                },
                            }}
                        >
                            <MenuItem value='Select Venue Type' disabled>Select Venue Type</MenuItem>
                            {['House', 'Apartment', 'Commercial Building'].map((venueType) => (
                                <MenuItem key={venueType} value={venueType}>
                                    {venueType}
                                </MenuItem>
                            ))}
                            {/* Add more language options as needed */}
                        </Select>
                        <TextField
                            value={productSpecification}
                            sx={{ m: 1 }}
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Product Specification"
                            name="price"
                            autoComplete="price"
                            autoFocus
                            onChange={(e) => {
                                setProductSpecification(e.target.value);
                            }}
                        />
                        <FormControlLabel sx={{ ml: 5 }} control={<Switch value={isInterior} checked={isInterior}
                            onChange={(e) => { setIsInterior(e.target.checked) }} />} label="Interior/Exterior" />
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                        <div>
                            <Typography variant='h6' sx={{ mt: 2 }}>Status</Typography>
                            <div style={{ display: "flex", flexDirection: 'row', alignItems: "center" }}>
                                <Select
                                    defaultValue='Booking Status'
                                    value={bookingStatus}
                                    onChange={(e) => setBookingStatus(e.target.value)}
                                    variant="outlined"
                                    inputProps={{ 'aria-label': 'language' }}
                                    sx={{
                                        m: 1,
                                        color: 'black',
                                        '& .MuiSelect-select': {
                                            '&:focus': {
                                                backgroundColor: 'transparent',
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value='Booking Status' disabled>Booking Status</MenuItem>
                                    {['Pending', 'Confirmed'].map((venueType) => (
                                        <MenuItem key={venueType} value={venueType}>
                                            {venueType}
                                        </MenuItem>
                                    ))}
                                    {/* Add more language options as needed */}
                                </Select>
                                <Select
                                    defaultValue='Project Status'
                                    value={projectStatus}
                                    onChange={(e) => setProjectStatus(e.target.value)}
                                    variant="outlined"
                                    inputProps={{ 'aria-label': 'language' }}
                                    sx={{
                                        m: 1,
                                        color: 'black',
                                        '& .MuiSelect-select': {
                                            '&:focus': {
                                                backgroundColor: 'transparent',
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value='Project Status' disabled>Project Status</MenuItem>
                                    {['Ongoing', 'Completed'].map((venueType) => (
                                        <MenuItem key={venueType} value={venueType}>
                                            {venueType}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Typography variant='h6' sx={{ mt: 2, ml: 1 }}>Lead Painter</Typography>
                            <Select
                                defaultValue='Select Lead Painter'
                                value={leadPainter}
                                onChange={(e) => { setLeadPainter(e.target.value) }}
                                variant="outlined"
                                inputProps={{ 'aria-label': 'language' }}
                                sx={{
                                    m: 1,
                                    color: 'black',
                                    '& .MuiSelect-select': {
                                        '&:focus': {
                                            backgroundColor: 'transparent',
                                        },
                                    },
                                    width: 250
                                }}
                            >
                                <MenuItem value='Select Lead Painter' disabled>Select Lead Painter</MenuItem>
                                {leadPainters?.map((leadPainter, index) => (
                                    <MenuItem key={leadPainter.id} value={leadPainter.id}>
                                        <Typography>{leadPainter.name}<Typography sx={{ fontSize: 11, color: 'gray' }}>{leadPainter.phone}</Typography></Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                        <div>
                            <Typography variant='h6' sx={{ mt: 2 }}>Dates</Typography>
                            <div style={{ display: "flex", flexDirection: 'row', alignItems: "center", marginTop: 10 }}>
                                <TextField type="date" label="Inspection Date" variant="outlined" sx={{
                                    m: 1,
                                    "& label.Mui-focused": {
                                        color: "gray"
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                            borderColor: "gray"
                                        }
                                    }
                                }} focused={true}
                                    value={inspectionDate}
                                    onChange={(e) => setInspectionDate(e.target.value)}
                                />
                                <TextField type="date" label="Start Date" variant="outlined" sx={{
                                    m: 1,
                                    "& label.Mui-focused": {
                                        color: "gray"
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                            borderColor: "gray"
                                        }
                                    }
                                }} focused={true}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <TextField type="date" label="End Date" variant="outlined" sx={{
                                    m: 1,
                                    "& label.Mui-focused": {
                                        color: "gray"
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                            borderColor: "gray"
                                        }
                                    }
                                }} focused={true}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <Typography variant='h6' sx={{ mt: 3, ml: 1 }}>Bill (PKR)</Typography>
                            <TextField label="Bill" sx={{ m: 1, width: 250 }}
                                value={bill}
                                onChange={(e) => setBill(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Update
                        {
                            loading && <CircularProgress size={15} color="inherit" sx={{ ml: 1 }} />
                        }
                    </Button>
                </Box>
            </Container>
        </Card >
    );
}
