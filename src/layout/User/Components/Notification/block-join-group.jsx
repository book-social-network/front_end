import { Box, Button } from "@mui/material";

const BlockJoinGroup = () => {
    return (
        <Box p={1}>
          <Button sx={{ margin: "5px" }} variant='contained'>
            Join
          </Button>
          <Button sx={{ margin: "5px" }} variant='outlined' color='error'>
            Delete
          </Button>
        </Box>
      )
}

export default BlockJoinGroup;
