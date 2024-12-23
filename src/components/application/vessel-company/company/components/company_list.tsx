'use client';

import React from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import CardMedia from '@mui/material/CardMedia';


// assets
const Flag1 = '/assets/images/widget/australia.jpg';
const Flag2 = '/assets/images/widget/brazil.jpg';
const Flag3 = '/assets/images/widget/germany.jpg';
const Flag4 = '/assets/images/widget/uk.jpg';
const Flag5 = '/assets/images/widget/usa.jpg';


const mockData = [
    {
      countryFlag: Flag2,
      companyName: "Vessel Company Name",
      companyType: "Yacht Management",
      contactName: "John Doe",
      phone: "+55 11 99999-9999",
      country: "Brazil",
      vessels: "Teresa Cristina",
      status: "Active",
      email: "asd@asd.com",
      licenseType: "Basic",
      licenseNumber: "1234567890",
      licenseDate: "2024-01-01",
      licenseExpiration: "2024-01-01",
      progress: 6
    },
    {
        countryFlag: Flag1,
        companyName: "Vessel Company Name",
        companyType: "Yacht Management",
        contactName: "John Doe",
        phone: "+55 11 99999-9999",
        country: "Brazil",
        vessels: "Teresa Cristina",
        status: "Active",
        email: "asd@asd.com",
        licenseType: "Basic",
        licenseNumber: "1234567890",
        licenseDate: "2024-01-01",
        licenseExpiration: "2024-01-01",
        progress: 2
    },
    {
        countryFlag: Flag2,
        companyName: "Vessel Company Name",
        companyType: "Yacht Management",
        contactName: "John Doe",
        phone: "+55 11 99999-9999",
        country: "Brazil",
        vessels: "Teresa Cristina",
        status: "Active",
        email: "asd@asd.com",
        licenseType: "Basic",
        licenseNumber: "1234567890",
        licenseDate: "2024-01-01",
        licenseExpiration: "2024-01-01",
        progress: 90
    },
    {
        countryFlag: Flag2,
        companyName: "Vessel Company Name",
        companyType: "Yacht Management",
        contactName: "John Doe",
        phone: "+55 11 99999-9999",
        country: "Brazil",
        vessels: "Teresa Cristina",
        status: "Active",
        email: "asd@asd.com",
        licenseType: "Basic",
        licenseNumber: "1234567890",
        licenseDate: "2024-01-01",
        licenseExpiration: "2024-01-01",
        progress: 100
    },
    {
        countryFlag: Flag3,
        companyName: "Vessel Company Name",
        companyType: "Yacht Management",
        contactName: "John Doe",
        phone: "+55 11 99999-9999",
        country: "Brazil",
        vessels: "Teresa Cristina",
        status: "Active",
        email: "asd@asd.com",
        licenseType: "Basic",
        licenseNumber: "1234567890",
        licenseDate: "2024-01-01",
        licenseExpiration: "2024-01-01",
        progress: 90
    },
    {
        countryFlag: Flag4,
        companyName: "Vessel Company Name",
        companyType: "Yacht Management",
        contactName: "John Doe",
        phone: "+55 11 99999-9999",
        country: "Brazil",
        vessels: "Teresa Cristina",
        status: "Active",
        email: "asd@asd.com",
        licenseType: "Basic",
        licenseNumber: "1234567890",
        licenseDate: "2024-01-01",
        licenseExpiration: "2024-01-01",
        progress: 18
    },
    {
        countryFlag: Flag2,
        companyName: "Vessel Company Name",
        companyType: "Yacht Management",
        contactName: "John Doe",
        phone: "+55 11 99999-9999",
        country: "Brazil",
        vessels: "Teresa Cristina",
        status: "Active",
        email: "asd@asd.com",
        licenseType: "Basic",
        licenseNumber: "1234567890",
        licenseDate: "2024-01-01",
        licenseExpiration: "2024-01-01",
        progress: 56
    },
    {
        countryFlag: Flag5,
        companyName: "Vessel Company Name",
        companyType: "Yacht Management",
        contactName: "John Doe",
        phone: "+55 11 99999-9999",
        country: "Brazil",
        vessels: "Teresa Cristina",
        status: "Active",
        email: "asd@asd.com",
        licenseType: "Basic",
        licenseNumber: "1234567890",
        licenseDate: "2024-01-01",
        licenseExpiration: "2024-01-01",
        progress: 19
    },
    // Add more mock data objects as needed
  ];

// ==============================|| USER LIST 2 ||============================== //

const CompanyList = () => {

  return (
    <TableContainer>
       <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
                <TableRow>
                  <TableCell>Country</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell sx={{ pl: 3 }}>Name of Contact Person</TableCell>
                  <TableCell>Type of Company</TableCell>
                  <TableCell>Type of License</TableCell>
                  <TableCell>License Number</TableCell>
                  <TableCell>Date of License</TableCell>
                  <TableCell align="center">Progress of License</TableCell>
                  <TableCell align="center" sx={{ pr: 3 }}>
                    Action
                  </TableCell>
                </TableRow>
        </TableHead>
        <TableBody>
            {mockData.map((item, index) => (
            <>
                <TableRow hover key={index}>
                    <TableCell>
                      <CardMedia component="img" image={item.countryFlag} title="image" sx={{ width: 30, height: 'auto' }} />
                    </TableCell>
                    <TableCell sx={{ pl: 3 }}>
                    <Typography variant="h6">{item.companyName}</Typography>
                    </TableCell>
                    <TableCell sx={{ pl: 3 }}>
                    <Typography variant="h6">{item.contactName}</Typography>
                    </TableCell>
                    <TableCell>
                    <Typography variant="h6">{item.companyType}</Typography>
                    </TableCell>
                    <TableCell>
                    <Typography variant="h6">{item.licenseType}</Typography>
                    </TableCell>
                    <TableCell>
                    <Typography variant="h6">{item.licenseNumber}</Typography>
                    </TableCell>
                    <TableCell>
                    <Typography variant="h6">{item.licenseDate}</Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Grid item sm zeroMinWidth>
                            <LinearProgress variant="determinate" value={56} color="primary" sx={{ minWidth: 90 }} aria-label="user-progress" />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">{item.progress}%</Typography>
                        </Grid>
                    </TableCell>
                    <TableCell align="center" sx={{ pr: 3 }}>
                      <Stack direction="row" justifyContent="center" alignItems="center">
                        <IconButton color="primary" size="large" aria-label="edit">
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton color="inherit" size="large" aria-label="delete">
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                </TableRow>
            </>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompanyList;