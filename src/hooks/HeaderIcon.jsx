import React from "react";
import { IconButton, Tooltip } from "@mui/material";

const useIconInHeader = (icon, title)=>{
return(
    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Tooltip title={title}>
            <IconButton sx={{color:"#000"}}>
                {icon}
            </IconButton>
        </Tooltip>
    </div>
)
}
export default useIconInHeader;