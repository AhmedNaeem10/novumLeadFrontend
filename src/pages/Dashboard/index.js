import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import AddIcon from '@mui/icons-material/Add';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import { getAppointments, getLeadPainters } from '../../apis';
import { handleNullStrings } from '../../helpers';
import { ManageBooking } from '../../components/Dashboard/ManageBooking';
import SuccessToast from '../../components/common/SuccessToast';
import FailedToast from '../../components/common/FailedToast';

const headCells = [
    {
        id: 'bookingId',
        numeric: false,
        disablePadding: true,
        label: 'Booking ID',
    },
    {
        id: 'bookingName',
        numeric: true,
        disablePadding: false,
        label: 'Booking Name',
    },
    {
        id: 'bookingLocation',
        numeric: true,
        disablePadding: false,
        label: 'Booking Location',
    },
    {
        id: 'venueType',
        disablePadding: false,
        label: 'Venue Type',
    },
    {
        id: 'bookingPhone',
        numeric: true,
        disablePadding: false,
        label: 'Booking Phone',
    },
    {
        id: 'venueDetails',
        numeric: true,
        disablePadding: false,
        label: 'Venue Details',
    },
    {
        id: 'estimatedLiters',
        numeric: true,
        disablePadding: false,
        label: 'Estimated Liters',
    },
    {
        id: 'estimated',
        numeric: true,
        disablePadding: false,
        label: 'Estimated Time',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                        align={headCell.numeric ? 'right' : 'left'}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected, handleDelete } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                    fontWeight={"bold"}
                >
                    Appointments
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export const Dashboard = () => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState();
    const [selected, setSelected] = React.useState([]);
    const [dense, setDense] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [change, setChange] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [booking, setBooking] = React.useState();
    const [leadPainters, setLeadPainters] = React.useState([]);
    const [openSuccess, setOpenSucess] = React.useState(false);
    const [openFailed, setOpenFailed] = React.useState(false);
    const [text, setText] = React.useState("");

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setData(await getAppointments());
            setLeadPainters(await getLeadPainters())
            setLoading(false);
        }
        fetchData();
    }, [change])

    const handleDelete = async () => {
        setChange(!change);
        setSelected([])
    }

    const toggleBackdrop = () => {
        setOpen(!open);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data?.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSucess(false);
        setOpenFailed(false);
    }

    const handleBackDrop = (event, booking) => {
        setOpen(!open);
        setBooking(booking);
    }

    return (
        <Box sx={{ width: '90%', marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* <Button sx={{ alignSelf: "flex-end" }} color="primary" startIcon={<AddIcon />} onClick={() => { setOpen(true) }}>
                Appointments
            </Button> */}
            <Paper sx={{ width: '100%' }}>
                <EnhancedTableToolbar numSelected={selected.length} handleDelete={handleDelete} />
                <TableContainer>
                    <Table
                        stickyHeader
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data?.length}
                        />
                        <TableBody>
                            {data?.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row?.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                        onClick={(event) => { handleBackDrop(event, row) }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(event) => { event.stopPropagation(); handleClick(event, row.id); }}
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                            align='center'
                                        >
                                            {row?.id}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                            align='center'
                                        >
                                            {handleNullStrings(row?.bookingName)}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            align='center'
                                            padding="none"
                                        >
                                            {handleNullStrings(row?.Venue?.location)}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                            align='center'
                                        >
                                            {handleNullStrings(row?.Venue?.venueType)}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {handleNullStrings(row?.bookingPhone)}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                            align='center'
                                        >
                                            {JSON.stringify(row?.Venue).slice(0, 10)}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                            align='center'
                                        >
                                            {handleNullStrings(row?.estimatedLiters)}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                            align='center'
                                        >
                                            {handleNullStrings(row?.estimatedDays)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <FormControlLabel
                    disabled={data?.length === 0}
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </Paper>

            {
                loading ? <CircularProgress color="inherit" sx={{ mt: 2 }} /> :
                    data?.length === 0 ? <Typography variant='h5' sx={{ textAlign: "center", marginTop: 10, color: "text.secondary", marginBottom: 50 }}>No Appointments available!</Typography> : <></>
            }
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <ManageBooking setOpen={setOpen} change={change} setChange={setChange} setOpenSuccess={setOpenSucess} setOpenFailed={setOpenFailed} setText={setText} data={booking} setData={setBooking} closeBackdrop={toggleBackdrop} leadPainters={leadPainters} />
            </Backdrop>
            <SuccessToast open={openSuccess} handleClose={handleClose} text={text} />
            <FailedToast open={openFailed} handleClose={handleClose} text={text} />
        </Box>
    );
}
