"use client";

// material-ui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import useAuth from '@/hooks/useAuth';

import { gridSpacing } from '@/store/constant';

// assets
import SubCard from '@/components/ui-components/cards/SubCard';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';
import { IconEdit } from '@tabler/icons-react';
import AvatarEdit from './avatar';

const Avatar3 = '/assets/images/users/avatar-3.png';


// personal details table
/** names Don&apos;t look right */
function createData(name: string, calories?: string, fat?: string, carbs?: string, protein?: string) {
  return { name, calories, fat, carbs, protein };
}

// ==============================|| PROFILE 1 - PROFILE ||============================== //

const ProfilePage = () => {
  const { user } = useAuth();

  const rows = [
    createData('Full Name', ':', user?.first_name),
    createData('Fathers Name', ':', 'Mr. Deepen Handgun'),
    createData('Address', ':', 'Street 110-B Kalians Bag, Dewan, M.P. INDIA'),
    createData('Zip Code', ':', '12345'),
    createData('Phone', ':', '+0 123456789 , +0 123456789'),
    createData('Email', ':', 'support@example.com'),
    createData('Website', ':', 'http://example.com')
  ];

  return (
    <Grid container spacing={gridSpacing}>
      <Grid size={{lg: 4, xs: 12}}>
        <SubCard
          title={
            <Grid container spacing={2} alignItems="center">
              <AvatarEdit />
              <Grid size={{xs: 12}}>
                <Typography variant="subtitle1">{user?.first_name}</Typography>
                <Typography variant="subtitle2">UI/UX Designer</Typography>
              </Grid>
            </Grid>
          }
        >
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton>
              <ListItemIcon>
                <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
              </ListItemIcon>
              <ListItemText primary={<Typography variant="subtitle1">Email</Typography>} />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  demo@sample.com
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemIcon>
                <PhonelinkRingTwoToneIcon sx={{ fontSize: '1.3rem' }} />
              </ListItemIcon>
              <ListItemText primary={<Typography variant="subtitle1">Phone</Typography>} />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  (+99) 9999 999 999
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemIcon>
                <PinDropTwoToneIcon sx={{ fontSize: '1.3rem' }} />
              </ListItemIcon>
              <ListItemText primary={<Typography variant="subtitle1">Location</Typography>} />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  Melbourne
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
         
        </SubCard>
      </Grid>
      <Grid size={{lg: 8, xs: 12}}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{xs: 12}}>
            <SubCard
              title="About me"
              secondary={
                <Button>
                  <IconEdit stroke={1.5} size="20px" aria-label="Edit Details" />
                </Button>
              }
            >
              <Grid container spacing={2}>
                <Grid size={{xs: 12}}>
                  <Typography variant="subtitle1">Personal Details</Typography>
                </Grid>
                <Divider sx={{ pt: 1 }} />
                <Grid size={{xs: 12}}>
                  <TableContainer>
                    <Table
                      sx={{
                        '& td': {
                          borderBottom: 'none'
                        }
                      }}
                      size="small"
                    >
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell variant="head">{row.name}</TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell>{row.fat}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
