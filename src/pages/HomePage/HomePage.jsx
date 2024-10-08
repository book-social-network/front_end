import React from "react";
import Header from "../../layout/User/Header";
import LeftContainer from "../../layout/User/LeftContainer";
import CenterContainer from "../../layout/User/CenterContainer";
import RighContainer from "../../layout/User/RightContainer";
import { Grid } from "@mui/material";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={0} sm={3}>
          <LeftContainer />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CenterContainer />
        </Grid>
        <Grid item xs={0} sm={3}>
          <RighContainer />
        </Grid>
      </Grid>
    </div>
  );
};
export default HomePage;
