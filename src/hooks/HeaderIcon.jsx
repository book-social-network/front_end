import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

const useIconInHeader = (icon, title, path = "/")=>{
return(
  <Link to={path}>
    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Tooltip title={title}>
            <IconButton sx={{color:"#000"}}>
                {icon}
            </IconButton>
        </Tooltip>
    </div>
  </Link>
)
}
export default useIconInHeader;