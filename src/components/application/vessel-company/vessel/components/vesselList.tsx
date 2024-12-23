// material-ui
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CardMedia from "@mui/material/CardMedia";
// project imports
import { gridSpacing } from "@/store/constant";

// assets
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MainCard from "@/components/ui-components/cards/MainCard";
import Chip from "@/components/ui-components/extended/Chip";

// assets
const Flag1 = "/assets/images/widget/australia.jpg";
const Flag2 = "/assets/images/widget/brazil.jpg";
const Flag3 = "/assets/images/widget/germany.jpg";
const Flag4 = "/assets/images/widget/uk.jpg";
const Flag5 = "/assets/images/widget/usa.jpg";

const mockVessels = [
  {
    countryFlag: Flag1,
    vesselName: "Teresa Cristina",
    companyName: "FS Yachts",
    imo: "2928382838",
    email: "contact@fsyachts.com",
    status: "Active",
  },
  {
    countryFlag: Flag2,
    vesselName: "Ocean Explorer",
    companyName: "Marine Co",
    imo: "1234567890",
    email: "info@marineco.com",
    status: "Inactive",
  },
  {
    countryFlag: Flag2,
    vesselName: "Ocean Care",
    companyName: "Marine Co",
    imo: "1234567232",
    email: "info@marineco.com",
    status: "Inactive",
  },
  {
    countryFlag: Flag2,
    vesselName: "Ocean Dream",
    companyName: "Marine Co",
    imo: "1234567232",
    email: "info@marineco.com",
    status: "Inactive",
  },
  {
    countryFlag: Flag1,
    vesselName: "Ocean Dream",
    companyName: "Marine Co",
    imo: "1234567232",
    email: "info@marineco.com",
    status: "Inactive",
  },
  {
    countryFlag: Flag2,
    vesselName: "Sea Explorer",
    companyName: "Blue Horizon Shipping",
    imo: "8765432101",
    email: "contact@bluehorizon.com",
    status: "Active",
  },
  {
    countryFlag: Flag3,
    vesselName: "Pacific Voyager",
    companyName: "Pacific Line",
    imo: "3456789012",
    email: "support@pacificline.com",
    status: "Active",
  },
  {
    countryFlag: Flag4,
    vesselName: "Atlantic Breeze",
    companyName: "Atlantic Traders",
    imo: "2345678901",
    email: "info@atlantictraders.com",
    status: "Inactive",
  },
  {
    countryFlag: Flag5,
    vesselName: "Global Navigator",
    companyName: "Global Shipping Ltd.",
    imo: "5678901234",
    email: "admin@globalshipping.com",
    status: "Active",
  },
  // Add more mock data as needed
];

// =========================|| LATEST ORDER CARD ||========================= //

export default function VesselList() {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard title="Vessel List" content={false}>
          <TableContainer>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Country</TableCell>
                  <TableCell sx={{ pl: 3 }}>Vessel Name</TableCell>
                  <TableCell sx={{ pl: 3 }}>Company Name</TableCell>
                  <TableCell>IMO</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center" sx={{ pr: 3 }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              {mockVessels.map((vessel, index) => (
                <TableBody key={index}>
                  <TableRow hover>
                    <TableCell sx={{ pl: 3 }}>
                      <CardMedia
                        component="img"
                        image={vessel.countryFlag}
                        title="image"
                        sx={{ width: 30, height: "auto" }}
                      />
                    </TableCell>
                    <TableCell sx={{ pl: 3 }}>{vessel.vesselName}</TableCell>
                    <TableCell>{vessel.companyName}</TableCell>
                    <TableCell>{vessel.imo}</TableCell>
                    <TableCell>{vessel.email}</TableCell>
                    <TableCell align="center">
                      <Chip
                        chipcolor={
                          vessel.status === "Active" ? "success" : "error"
                        }
                        label={vessel.status}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ pr: 3 }}>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          size="large"
                          aria-label="edit"
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          color="inherit"
                          size="large"
                          aria-label="delete"
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="text" size="small">
              View all Orders
            </Button>
          </CardActions>
        </MainCard>
      </Grid>
    </Grid>
  );
}
