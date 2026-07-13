import { Container, Typography, Paper } from "@mui/material";

function DashboardPage() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Paper
        sx={{
          p: 4,
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Medicine Form Builder
        </Typography>

        <Typography mt={2}>Frontend Setup Completed</Typography>
      </Paper>
    </Container>
  );
}

export default DashboardPage;
