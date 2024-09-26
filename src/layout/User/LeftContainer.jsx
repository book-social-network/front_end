import React from "react";
import "../../css/leftContainer.css"; // Import CSS
import AvatarUser from "../../assets/images/MeoAnhLongNgan.webp";
import { Grid, Avatar, Typography, Button } from "@mui/material";
import { Group, Bookmark, Feed, GroupWork } from "@mui/icons-material";

function LeftContainer() {
  return (
    <Grid container className="left-container">
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
        <Grid item className="avatar" xs={1}>
          <Avatar alt="avatar user" src={AvatarUser} />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Minh Đức
          </Typography>
        </Grid>
      </Grid>

      {/* Friends Button */}
      <Grid item xs={12}>
        <Button
          fullWidth
          color="primary"
          startIcon={<Group />}
          className="button"
        >
          <Typography variant="h6" sx={{ textTransform: "none" }}>
            Friends
          </Typography>
        </Button>
      </Grid>

      {/* Save Button */}
      <Grid item xs={12}>
        <Button
          fullWidth
          color="primary"
          startIcon={<Bookmark />}
          className="button"
        >
          <Typography variant="h6" sx={{ textTransform: "none" }}>
            Save
          </Typography>
        </Button>
      </Grid>

      {/* News Feed Button */}
      <Grid item xs={12}>
        <Button
          fullWidth
          color="primary"
          startIcon={<Feed />}
          className="button"
        >
          <Typography variant="h6" sx={{ textTransform: "none" }}>
            News Feed
          </Typography>
        </Button>
      </Grid>

      {/* Groups Button */}
      <Grid item xs={12}>
        <Button
          fullWidth
          color="primary"
          startIcon={<GroupWork />}
          className="button"
        >
          <Typography variant="h6" sx={{ textTransform: "none" }}>
            Groups
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
}

export default LeftContainer;
