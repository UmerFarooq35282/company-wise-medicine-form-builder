import { Box, CircularProgress } from "@mui/material";

function PageLoader() {
  return (
    <Box
      sx={{
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default PageLoader;
