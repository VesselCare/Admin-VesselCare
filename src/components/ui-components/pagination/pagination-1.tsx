"use client";
import { Grid, Pagination, Button, Menu, MenuItem } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useState } from "react";
import { gridSpacing } from "@/store/constant";

const Pagination1 = () => {
  const [anchorEl, setAnchorEl] = useState<
    Element | (() => Element) | null | undefined
  >(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item xs={12} sx={{ mt: 1.75 }}>
      <Grid container justifyContent="space-between" spacing={gridSpacing}>
        <Grid item>
          <Pagination count={10} color="primary" />
        </Grid>
        <Grid item>
          <Button
            variant="text"
            size="large"
            sx={{ color: "grey.900" }}
            color="secondary"
            endIcon={<ExpandMoreRoundedIcon />}
            onClick={handleClick}
          >
            10 Rows
          </Button>
          <Menu
            id="menu-user-list-style2"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            variant="selectedMenu"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleClose}> 10 Rows</MenuItem>
            <MenuItem onClick={handleClose}> 20 Rows</MenuItem>
            <MenuItem onClick={handleClose}> 30 Rows </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Pagination1;
