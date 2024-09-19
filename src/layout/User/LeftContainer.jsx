import React from "react";
import AvatarUser from "../../assets/images/MeoAnhLongNgan.webp";
import { Grid, Avatar, Typography, Button } from "@mui/material";
import { Group } from "@mui/icons-material";

function LeftContainer() {

  return (
    <Grid
      container
      margin={2}
      sx={{ alignContent: "start", alignItems: "center" }}
    >
      {/* User Info */}
      <Grid xs={12} sx={{ display: "flex", alignItems: "center" }}>
        <Grid item marginRight={2} xs={1}>
          <Avatar alt="avatar user" src={AvatarUser} />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h6">Minh Đức</Typography>
        </Grid>
      </Grid>
      <Grid xs={12} sx={{ marginTop: 2 }}>
        <Button
          fullWidth
          color="primary"
          startIcon={<Group />}
          sx={{ justifyContent: "flex-start", textAlign: "left" }}
        >
          <Typography variant="h6" sx={{ textTransform: 'none' }}>
            Friends
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
}

export default LeftContainer;
