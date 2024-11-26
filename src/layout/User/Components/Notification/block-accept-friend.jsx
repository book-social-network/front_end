import { Box, Button } from "@mui/material";

const BlockAcceptFriend = () => {
    return (
        <Box p={1}>
          <Button sx={{ margin: "5px" }} variant='contained'>
            Confirm
          </Button>
          <Button sx={{ margin: "5px" }} variant='outlined' color='error'>
            Delete
          </Button>
        </Box>
      )
}

export default BlockAcceptFriend;
