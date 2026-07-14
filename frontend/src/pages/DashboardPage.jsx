import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";

import DashboardLayout from "../components/layout/DashboardLayout";
import MedicineForm from "../components/medicine/MedicineForm";

function DashboardPage() {
  const [organizationId, setOrganizationId] = useState("");
  const [companyId, setCompanyId] = useState("");

  return (
    <DashboardLayout>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f6f8",
          p: 3,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 700,
            borderRadius: 4,
            p: 5,
          }}
        >
          <Typography variant="h4" fontWeight={700} textAlign="center" mb={4}>
            Medicine Form Builder
          </Typography>

          <MedicineForm
            organizationId={organizationId}
            companyId={companyId}
            setOrganizationId={setOrganizationId}
            setCompanyId={setCompanyId}
          />
        </Paper>
      </Box>
    </DashboardLayout>
  );
}

export default DashboardPage;
