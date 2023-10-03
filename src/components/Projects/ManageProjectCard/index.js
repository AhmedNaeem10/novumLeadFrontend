import React from 'react';
import { Card, CardHeader, CircularProgress, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Switch from '@mui/material/Switch';
import { updateProjectStages } from '../../../apis';

export const ManageProjectCard = ({ data, closeBackdrop, loading, setOpenSucess, setOpenFailed, setChange, change, setText }) => {
    const [stages, setStages] = React.useState([]);

    const handleSubmit = async () => {
        const response = await updateProjectStages(data?.id, stages)
        if (response?.status == "success") {
            setText("Stages successfully updated!");
            setOpenSucess(true);
        } else {
            setText("An error occurred while updating stages!")
            setOpenFailed(true);
        }
        closeBackdrop();
        setChange(!change)
    }

    const handleStageUpdate = (stage) => {
        if (stages.includes(stage)) {
            let copyStages = [...stages]
            copyStages.splice(copyStages.indexOf(stage), 1);
            setStages(copyStages);
        } else {
            let copyStages = [...stages]
            copyStages.push(stage);
            setStages(copyStages);
        }
    }

    React.useEffect(() => {
        if (data) {
            let names = []
            for (let stage of data.BookingStages) {
                if (stage.status) {
                    names.push(stage.stage)
                }
            }
            setStages(names);
        }
    }, [data])

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
                title={"Update Project Stages"}
                sx={{ color: "black" }}
            />

            <Container component="main">
                <Box sx={{ mt: 1 }}>
                    <div style={{ display: "flex", flexDirection: 'row', alignItems: "center" }}>
                        <Typography variant='h6' sx={{ mt: 2 }}>{`Booking ID: ${data?.id}`}</Typography>
                        <Typography variant='h6' sx={{ mt: 2, ml: 4 }}>{`Booking Name: ${data?.bookingName}`}</Typography>
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant='h6' sx={{ mt: 2 }}>{`Venue Type: ${data?.Venue?.venueType}`}</Typography>
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant='h6' sx={{ mt: 4 }}>Update Project Stages:</Typography>
                    </div>
                    {
                        data?.BookingStages?.map((stage, index) => {
                            return (
                                <Box key={index} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2 }}>
                                    <Typography sx={{ fontSize: 18 }}>{stage?.stage}</Typography>
                                    <Switch checked={stages.includes(stage.stage)} onClick={() => { handleStageUpdate(stage.stage) }} />
                                </Box>
                            );
                        })
                    }
                    <Button
                        onClick={handleSubmit}
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