import { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";

import DashboardLayout from "../components/layout/DashboardLayout";

import OrganizationSelect from "../components/organizations/OrganizationSelect";

function DashboardPage() {
  const [organizationId, setOrganizationId] = useState("");

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={700}>
              Medicine Management
            </Typography>

            <Typography color="text.secondary" mt={1}>
              Manage organizations, companies and medicines.
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3, minHeight: 500 }}>
            <OrganizationSelect
              value={organizationId}
              onChange={setOrganizationId}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3, minHeight: 500 }}>Right Panel</Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default DashboardPage;
