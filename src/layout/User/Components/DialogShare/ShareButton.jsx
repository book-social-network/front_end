import React, { useState } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import ShareDialog from "./DialogShare";
import { FaShare } from 'react-icons/fa'

export default function ShareButton() {
  const [open, setOpen] = useState(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
              <FaShare />
              <Typography paddingLeft={1}>Share</Typography>
            </IconButton> 

      <ShareDialog open={open} onClose={handleClose} />
    </>
  );
}