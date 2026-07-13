import { Box, AppBar, Toolbar, Typography, Container } from "@mui/material";

function DashboardLayout({ children }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fb" }}>
      <AppBar elevation={1} position="static">
        <Toolbar>
          <Typography variant="h6" fontWeight={700}>
            Company Wise Medicine Form Builder
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </Box>
  );
}

export default DashboardLayout;
